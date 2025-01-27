import { indexedDBService } from './indexedDB';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

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

export const productosAPI = {
  buscarProducto: async (codigo: string): Promise<Producto | null> => {
    console.log('Buscando producto:', codigo);
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
    console.log('Guardando producto:', producto);
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
      await indexedDBService.actualizarProducto(producto); // actualizamos la tabla para mostrar sin conexión
      await indexedDBService.guardarProductoPendiente(producto); // guardamos el producto pendiente de sincronizar con el backend al encontrar conexión
      return null;
    }
  },

  buscarProductosEmpresa: async (): Promise<Producto[]> => {
    console.log('Buscando productos de la empresa');
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
  },
  sincronizarProductosPendientes: async (): Promise<void> => {
    const productosPendientes = await indexedDBService.buscarProductosPendientes();
    console.log('Productos pendientes:', productosPendientes);
    for (const producto of productosPendientes) {
      await productosAPI.guardarProducto(producto);
      await indexedDBService.borrarProductoPendiente(producto.codigoBarras);
    }
  }
};