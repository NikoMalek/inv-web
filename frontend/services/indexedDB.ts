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

const DB_NAME = 'inv-web';
const DB_VERSION = 2;
const STORE_NAME = 'productos';
const PENDING_STORE_NAME = 'productos_pendientes';

export const indexedDBService = {
  async initDB(): Promise<void> { // Inicializa la base de datos
    return new Promise((resolve, reject) => {
      // limpiar la base de datos
      const deleteRequest = indexedDB.deleteDatabase(DB_NAME);
      
      deleteRequest.onerror = () => reject(deleteRequest.error);
      deleteRequest.onsuccess = () => resolve();

      const request = indexedDB.open(DB_NAME, DB_VERSION); // Abre la base de datos o la crea si no existe
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
      
      request.onupgradeneeded = (event) => { // Se ejecuta cuando se necesita actualizar la base de datos
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'codigoBarras' });
        }
        if (!db.objectStoreNames.contains(PENDING_STORE_NAME)) {
          db.createObjectStore(PENDING_STORE_NAME, { keyPath: 'codigoBarras' });
        }
      }
    });
  },
  async guardarProductos(productos: Producto[]): Promise<void> { // Guarda un producto en la base de datos
    const db = await this.getDB();
    const tx = db.transaction(STORE_NAME, 'readwrite'); // 'readwrite' es el modo de transacción el cual permite leer y escribir en la base de datos
    const store = tx.objectStore(STORE_NAME); // Obtenemos el almacen de objetos(tabla) de la base de datos

    return Promise.all(
        productos.map((producto) => 
          new Promise<void>((resolve, reject) => {
            const request = store.put(producto); // Guarda un producto en la base de datos
            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve();
        })
      )
    ).then(() => {});
  },
  async buscarProductos(): Promise<Producto[]> { // Busca un producto en la base de datos
    const db = await indexedDBService.getDB();
    const tx = db.transaction(STORE_NAME, 'readonly'); // 'readonly' es el modo de transacción el cual permite leer en la base de datos
    const store = tx.objectStore(STORE_NAME); // Obtenemos el almacen de objetos(tabla) de la base de datos

    return new Promise((resolve, reject) => { 
      const request = store.getAll(); // Obtenemos todos los productos de la base de datos
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  },
  async actualizarProducto(producto: Producto): Promise<void> { // Actualiza un producto en la base de datos
    const db = await this.getDB();
    const tx = db.transaction(STORE_NAME, 'readwrite'); // 'readwrite' es el modo de transacción el cual permite leer y escribir en la base de datos
    const store = tx.objectStore(STORE_NAME); // Obtenemos el almacen de objetos(tabla) de la base de datos

    return new Promise((resolve, reject) => {
      const request = store.put(producto); // Guarda un producto en la base de datos
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });

  },

  async guardarProductoPendiente(producto: Producto): Promise<void> { // Guarda un producto pendiente en la base de datos cuando no hay conexión
    const db = await this.getDB();
    const tx = db.transaction(PENDING_STORE_NAME, 'readwrite'); // 'readwrite' es el modo de transacción el cual permite leer y escribir en la base de datos
    const store = tx.objectStore(PENDING_STORE_NAME); // Obtenemos el almacen de objetos(tabla) de la base de datos

    return new Promise((resolve, reject) => {
      const request = store.put(producto); // Guarda un producto en la base de datos
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  },

  async buscarProductosPendientes(): Promise<Producto[]> { // Busca un producto pendiente en la base de datos cuando no hay conexión
    const db = await indexedDBService.getDB();
    const tx = db.transaction(PENDING_STORE_NAME, 'readonly'); // 'readonly' es el modo de transacción el cual permite leer en la base de datos
    const store = tx.objectStore(PENDING_STORE_NAME); // Obtenemos el almacen de objetos(tabla) de la base de datos

    return new Promise((resolve, reject) => {
      const request = store.getAll(); // Obtenemos todos los productos de la base de datos
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  },
  async borrarProductoPendiente(codigoBarras: string): Promise<void> { // Borra un producto pendiente en la base de datos cuando se encuentra conexión
    const db = await this.getDB();
    const tx = db.transaction(PENDING_STORE_NAME, 'readwrite'); // 'readwrite' es el modo de transacción el cual permite leer y escribir en la base de datos
    const store = tx.objectStore(PENDING_STORE_NAME); // Obtenemos el almacen de objetos(tabla) de la base de datos

    return new Promise((resolve, reject) => {
      const request = store.delete(codigoBarras); // Borra un producto en la base de datos
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  },

  async getDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  },
};