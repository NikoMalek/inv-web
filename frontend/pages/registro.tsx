import React, { useState } from "react";
import RegistroProductos from "../components/registroproducto";


interface Producto {
  name: string;
  barcode: string;
  cantidad: number;
  image?: string;
}


const App: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);

  const guardarProducto = (producto: Producto) => {
    setProductos([...productos, producto]);
    console.log("Producto guardado:", producto);
  };

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
      setProductos([...productos, savedProducto]);
      console.log("Producto guardado en el backend:", savedProducto);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <div className=" h-screen w-screen  bg-gray-50 dark:bg-gray-900">
      
      <RegistroProductos
        productos={productos}
        onGuardarProducto={guardarProducto}
        buscarProductoLocal={buscarProductoLocal}
        guardarProductoLocal={guardarProductoLocal}
      />
    </div>
  );
};

export default App;