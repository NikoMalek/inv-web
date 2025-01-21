import React, { useState } from "react";
import RegistroProductos from "../components/registroproducto";

interface Producto {
  nombre: string;
  codigoBarras: string;
  cantidad: number;
  imagen?: string;
  precio: number;
  ultima_actualizacion: string;
  id_empresa: string;
  id_reponedor: string;
}

interface UserData {
  userData: {
    id: string;
    idEmpresa: string;
  };
}

const App: React.FC<UserData> = ({ userData }) => {
  const [productos, setProductos] = useState<Producto[]>([]);

  const guardarProducto = (producto: Producto) => {
    setProductos((prevProductos) => [...prevProductos, producto]);
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
      setProductos((prevProductos) => [...prevProductos, savedProducto]);
      console.log("Producto guardado en el backend:", savedProducto);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const buscarProductosEmpresa = async (): Promise<Producto[]> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/inventario`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    if (!response.ok) {
      throw new Error('Error al buscar los productos');
    }
    const productosEmpresa: Producto[] = await response.json();
    return productosEmpresa;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 flex flex-col justify-start items-center overflow-auto h-screen ">
      <div className="container max-w-4xl mx-auto p-6 mt-12">
        <RegistroProductos
          productos={productos}
          onGuardarProducto={(producto) => guardarProducto({ ...producto, id_empresa: userData.idEmpresa, id_reponedor: userData.id })}
          buscarProductoLocal={buscarProductoLocal}
          guardarProductoLocal={(producto) => guardarProductoLocal({ ...producto, id_empresa: userData.idEmpresa, id_reponedor: userData.id })}
          buscarProductosEmpresa={buscarProductosEmpresa}
        />
      </div>
    </div>
  );
};

export default App;
