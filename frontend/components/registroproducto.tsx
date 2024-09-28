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
  const [activeTab, setActiveTab] = useState('add')

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
      console.log("Formulario inválido");
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
    <div className="min-h-screen p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8">
          <div className="flex flex-row items-center justify-between">
            <h1 className="text-3xl font-bold">Sistema de Inventario</h1>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex border-b border-gray-200">
            <button
              className={`py-2 px-4 ${activeTab === 'add' ? 'border-b-2 border-blue-500' : ''}`}
              onClick={() => setActiveTab('add')}
            >
              📦 Agregar Producto
            </button>
            <button
              className={`py-2 px-4 ${activeTab === 'list' ? 'border-b-2 border-blue-500' : ''}`}
              onClick={() => setActiveTab('list')}
            >
              📋 Lista de Productos
            </button>
          </div>

          {activeTab === 'add' && (
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Agregar Nuevo Producto</h2>
              <form ref={formRef} onSubmit={guardarProducto} noValidate>
                <div className="grid grid-cols-1 gap-6 mb-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="nombre" className="block text-sm font-medium">Nombre del producto</label>
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      placeholder="Ej: Camiseta de algodón"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md dark:text-gray-900"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="codigoBarras" className="block text-sm font-medium">Código de barras</label>
                    <div className="flex">
                      <input
                        id="codigoBarras"
                        name="codigoBarras"
                        type="text"
                        placeholder="Escanear o ingresar código"
                        value={codigoBarras}
                        onChange={(e) => setCodigoBarras(e.target.value)}
                        className="flex-grow p-2 border border-gray-300 rounded-l-md dark:text-gray-900"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setUsandoCamara(!usandoCamara)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
                      >
                        📷
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="precio" className="block text-sm font-medium">Precio</label>
                    <input
                      id="precio"
                      name="precio"
                      type="text"
                      placeholder="Ej: 19.99"
                      value={precio}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, ''); // Elimina caracteres no numéricos
                        if (value.length > 9) {
                          value = value.slice(0, 9); // Limita a 9 dígitos
                        }
                        setPrecio(value ? Number(value) : 0); // Permite borrar todos los caracteres
                      }}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="cantidad" className="block text-sm font-medium">Cantidad</label>
                    <input
                      id="cantidad"
                      name="cantidad"
                      type="number"
                      placeholder="Ej: 100"
                      value={cantidad}
                      onChange={(e) => setCantidad(Number(e.target.value))}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>
                {usandoCamara && (
                  <div className="mt-6 space-y-4 col-span-2">
                  <div className="flex space-x-4">
                    <Webcam
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      className="w-1/2 h-64 border rounded-md shadow-md"
                    />
                    {imagen && (
                      <img src={imagen} alt="Producto" className="w-1/2 h-64 object-contain rounded-md shadow-md ml-4" />
                    )}
                  </div>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={capturarCodigoDesdeCamara}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                      >
                        Capturar Código
                      </button>
                      <button
                        type="button"
                        onClick={capturarImagen}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                      >
                        Capturar Imagen
                      </button>
                    </div>
                  </div>
                )}
                <div className="mt-6 space-y-4 col-span-2">
                  <div className="flex justify-between items-center">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                      💾 Guardar Producto
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'list' && (
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Lista de Productos</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Imagen</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nombre</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Código de Barras</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Precio</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Cantidad</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {productos.map((producto) => (
                      <tr key={producto.codigoBarras}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img src={producto.imagen} alt={producto.nombre} className="w-20 h-20 object-contain rounded-md" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{producto.nombre}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{producto.codigoBarras}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{producto.precio}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{producto.cantidad}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistroProductos;