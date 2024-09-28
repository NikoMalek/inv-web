import React, { useState, useCallback, useRef } from "react";
import Webcam from "react-webcam";

interface Producto {
  nombre: string;
  codigoBarras: string;
  cantidad: number;
  imagen?: string;
  precio: number;
  ultima_actualizacion: string;
}

interface UserData{
  id: string;
  idEmpresa: string;
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
  guardarProductoLocal,
}) => {
  const [nombre, setNombre] = useState<string>("");
  const [codigoBarras, setCodigoBarras] = useState<string>("");
  const [cantidad, setCantidad] = useState<number>(1);
  const [precio, setPrecio] = useState<number>(0);
  const [imagen, setImagen] = useState<string>("");
  const [usandoCamara, setUsandoCamara] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const buscarProductoPorCodigo = async (codigo: string) => {
    try {
      const productoLocal = await buscarProductoLocal(codigo);
      if (productoLocal) {
        setNombre(productoLocal.nombre);
        setImagen(productoLocal.imagen || "");
        setCantidad(1);
        return;
      }

      const response = await fetch(
        `https://world.openfoodfacts.org/api/v2/product/${codigo}.json`
      );
      const data = await response.json();

      if (data.status === 1) {
        setNombre(data.product.product_name || "");
        setImagen(data.product.image_url || "");
        setCantidad(1);
      } else {
        console.log("Producto no encontrado");
        limpiarFormulario();
      }
    } catch (error) {
      console.error("Error al buscar el producto:", error);
      limpiarFormulario();
    }
  };

  const capturarCodigoDesdeCamara = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      console.log("Captura desde cámara: ", imageSrc);
      const codigoBarrasDetectado = "3017620422003"; // Simulación
      setCodigoBarras(codigoBarrasDetectado);
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
      const ultima_actualizacion = new Date().toISOString();
      const nuevoProducto: Producto = { nombre, codigoBarras, cantidad, imagen, precio, ultima_actualizacion };
      await guardarProductoLocal(nuevoProducto);
      onGuardarProducto(nuevoProducto);
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
    setPrecio(0);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Registro de Productos
      </h2>

      <form ref={formRef} onSubmit={guardarProducto} noValidate>
        <div className="grid grid-cols-1 gap-6 mb-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Nombre del Producto
            </label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
              placeholder="Ingrese el nombre del producto"
              required
            />
          </div>

          <div>
            <label
              htmlFor="codigoBarras"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Código de Barras
            </label>
            <div className="flex items-center">
              <input
                type="text"
                id="codigoBarras"
                value={codigoBarras}
                onChange={(e) => setCodigoBarras(e.target.value)}
                className="flex-1 p-3 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                placeholder="Ingrese o escanee el código de barras"
                required
              />
              <button
                type="button"
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                onClick={() => setUsandoCamara(!usandoCamara)}
              >
                {usandoCamara ? "Cerrar Cámara" : "Escanear Código"}
              </button>
            </div>
          </div>
        </div>

        {usandoCamara && (
          <div className="mb-4">
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-full h-64 border rounded-md shadow-md"
            />
            <div className="flex space-x-2 mt-2">
              <button
                type="button"
                className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
                onClick={capturarCodigoDesdeCamara}
              >
                Capturar Código
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                onClick={capturarImagen}
              >
                Capturar Imagen
              </button>
            </div>
          </div>
        )}

        {imagen && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Imagen del Producto
            </label>
            <img
              src={imagen}
              alt="Imagen del Producto"
              className="w-full h-64 border rounded-md shadow-md object-cover"
            />
          </div>
        )}





        <div className="mb-4">
          <label
            htmlFor="precio"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Precio
          </label>
          <input
            type="number"
            id="precio"
            value={precio}
            onChange={(e) => {
              const value = e.target.value.slice(0, 9); // Limita a 9 dígitos
              setPrecio(Number(value));
            }}
            maxLength={9}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
          />
        </div>




        <div className="mb-4">
          <label
            htmlFor="cantidad"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Cantidad
          </label>
          <input
            type="number"
            id="cantidad"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
          />
        </div>

        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
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
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Nombre
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Código de Barras
            </th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                {producto.nombre}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {producto.codigoBarras}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegistroProductos;
