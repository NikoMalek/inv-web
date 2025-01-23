import { indexedDBService } from './indexedDB';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface Producto {
  nombre: string;
  codigoBarras: string;
  cantidad: number;
  imagen?: string;
  precio: number;
  ultima_actualizacion: string;

}

export const productosAPI = {
  buscarProducto: async (codigo: string): Promise<Producto | null> => {
    try {
      const response = await fetch(`${API_URL}/productos/${codigo}`);
      if (!response.ok) {
        throw new Error('Error al buscar el producto');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  },

  guardarProducto: async (producto: Producto): Promise<Producto | null> => {
    try {
      const response = await fetch(`${API_URL}/productos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(producto),
      });

      if (!response.ok) {
        throw new Error('Error al guardar el producto');
      }
      await indexedDBService.actualizarProducto(producto);

      return await response.json();
    } catch (error) {
      console.error('Error saving product:', error);
      return null;
    }
  },

  buscarProductosEmpresa: async (): Promise<Producto[]> => {
    try {
      const response = await fetch(`${API_URL}/inventario`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Error al buscar los productos');
      }

      const productos = await response.json();
      console.log('productos:', productos);
      await indexedDBService.guardarProductos(productos);
      
      return productos;
    } catch (error) {
      console.error('Error fetching products:', error);
      return await indexedDBService.buscarProductos();
    }
  }
};