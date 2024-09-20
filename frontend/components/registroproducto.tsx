import React, { useState, useCallback, useRef } from "react";
import Webcam from "react-webcam";

interface Producto {
  nombre: string;
  codigoBarras: string;
  cantidad: number;
  imagen?: string;
}

interface RegistroProductosProps {
  productos: Producto[];
  onGuardarProducto: (producto: Producto) => void;
  buscarProductoLocal: (codigo: string) => Promise<Producto | null>; // Función para buscar en la base de datos
  guardarProductoLocal: (producto: Producto) => Promise<void>; // Función para guardar en la base de datos
}

const RegistroProductos: React.FC<RegistroProductosProps> = ({
  productos,
  onGuardarProducto,
  buscarProductoLocal,
  guardarProductoLocal
}) => {
  const [nombre, setNombre] = useState<string>("");
  const [codigoBarras, setCodigoBarras] = useState<string>("");
  const [cantidad, setCantidad] = useState<number>(1);
  const [imagen, setImagen] = useState<string>("");
  const [usandoCamara, setUsandoCamara] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Función para buscar producto en Open Food Facts
  const buscarProductoPorCodigo = async (codigo: string) => {
    try {
      // Primero buscar en la base de datos local
      const productoLocal = await buscarProductoLocal(codigo);
      if (productoLocal) {
        // Producto encontrado en base de datos local 
        setNombre(productoLocal.nombre);
        setImagen(productoLocal.imagen || "");
        setCantidad(1);
        return;
      }

      // Si no está en la base de datos, buscar en Open Food Facts
      const response = await fetch(
        `https://world.openfoodfacts.org/api/v2/product/${codigo}.json`
      );
      const data = await response.json();

      if (data.status === 1) {
        // Producto encontrado en Open Food Facts
        setNombre(data.product.product_name || "");
        setImagen(data.product.image_url || "");
        setCantidad(1);
      } else {
        // Producto no encontrado en Open Food Facts
        console.log("Producto no encontrado");
        limpiarFormulario(); // Limpiar el formulario si no se encuentra
      }
    } catch (error) {
      console.error("Error al buscar el producto:", error);
      limpiarFormulario(); // Limpiar el formulario en caso de error
    }
  };

  // Capturar el código desde la cámara
  const capturarCodigoDesdeCamara = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      console.log("Captura desde cámara: ", imageSrc);

      // Ejemplo de código de barras detectado
      const codigoBarrasDetectado = "3017620422003";
      setCodigoBarras(codigoBarrasDetectado);

      // Buscar el producto con el código detectado
      buscarProductoPorCodigo(codigoBarrasDetectado);
    }
  }, [webcamRef]);

  const capturarImagen = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImagen(imageSrc);
    }
  };

  const guardarProducto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formRef.current?.checkValidity()) {
      const nuevoProducto: Producto = { nombre, codigoBarras, cantidad, imagen };
      onGuardarProducto(nuevoProducto);
      await guardarProductoLocal(nuevoProducto);
      limpiarFormulario();
    } else {
      formRef.current?.reportValidity();
    }
  };

  const limpiarFormulario = () => {
    setNombre("");
    setCodigoBarras("");
    setCantidad(1);
    setImagen("");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Registro de Productos
      </h2>
      

      <form ref={formRef} onSubmit={guardarProducto} noValidate>
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Nombre del Producto
          </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 text-black"
            placeholder="Ingrese el nombre del producto"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="codigoBarras" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Código de Barras
          </label>
          <div className="flex items-center">
            <input
              type="text"
              id="codigoBarras"
              value={codigoBarras}
              onChange={(e) => setCodigoBarras(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 text-black"
              placeholder="Ingrese o escanee el código de barras"
              required
            />
            <button
              type="button"
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
              onClick={() => setUsandoCamara(!usandoCamara)}
            >
              {usandoCamara ? 'Cerrar Cámara' : 'Escanear Código'}
            </button>
          </div>
        </div>

        {usandoCamara && (
          <div className="mb-4">
            <Webcam ref={webcamRef} screenshotFormat="image/jpeg" className="w-full h-64 border rounded-md shadow-md" />
            <button
              type="button"
              className="mt-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
              onClick={capturarCodigoDesdeCamara}
            >
              Capturar Código
            </button>
            <button
              type="button"
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              onClick={capturarImagen}
            >
              Capturar Imagen
            </button>
          </div>
        )}

        {imagen && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Imagen del Producto
            </label>
            <img src={imagen} alt="Imagen del Producto" className="w-full h-64 border rounded-md shadow-md" />
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="cantidad" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Cantidad
          </label>
          <input
            type="number"
            id="cantidad"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 text-black"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
        >
          Guardar Producto
        </button>
      </form>
      <hr className="my-6 border-gray-300 dark:border-gray-600" />

      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Lista de Productos
      </h3>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Nombre</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Código de Barras</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{producto.nombre}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{producto.codigoBarras}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegistroProductos;
