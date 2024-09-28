import React, { useState } from "react";
import RegistroProductos from "../components/registroproducto";

interface Producto {
  nombre: string;
  codigoBarras: string;
  cantidad: number;
  imagen?: string;
}

interface UserData {
  userData: {
    id: string;
  };
}

const App: React.FC<UserData> = ({ userData }) => {
  const [productos, setProductos] = useState<Producto[]>([]);

  // Función para guardar un nuevo producto
  const guardarProducto = (producto: Producto) => {
    setProductos((prevProductos) => [...prevProductos, producto]);
    console.log("Producto guardado:", producto);
  };

  // Función para buscar un producto en la base de datos local
  const buscarProductoLocal = async (codigo: string): Promise<Producto | null> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/productos/${codigo}`);
      if (!response.ok) {
        throw new Error('Error al buscar el producto');
      }
      const producto: Producto = await response.json();
      return producto;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  };

  // Función para guardar un producto en la base de datos local
  const guardarProductoLocal = async (producto: Producto): Promise<void> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/productos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(producto),
      });

      if (!response.ok) {
        throw new Error('Error al guardar el producto');
      }

      const savedProducto: Producto = await response.json();
      setProductos((prevProductos) => [...prevProductos, savedProducto]);
      console.log("Producto guardado en el backend:", savedProducto);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
      <div className="container max-w-4xl mx-auto p-6 mt-12"> {/* Añadido un margen superior para separarlo del navbar */}
        <RegistroProductos
          productos={productos}
          onGuardarProducto={guardarProducto}
          buscarProductoLocal={buscarProductoLocal}
          guardarProductoLocal={guardarProductoLocal}
        />
        {/* Si necesitas mostrar el ID del usuario, descomenta la línea de abajo */}
        {/* <h3 className="text-black">Hola señor de ID: {userData.id}</h3> */}
      </div>
    </div>
  );
};

export default App;
