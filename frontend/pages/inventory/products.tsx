import TablaProducto from '@/components/tables/tablaProductos';
import { useEffect, useState } from 'react';
import { productosAPI } from '@/services/productos';


interface Producto {
  nombre: string;
  codigoBarras: string;
  cantidad: number;
  imagen?: string;
  precio: number;
  ultima_actualizacion: string;
}

const Productos: React.FC<Producto> = () => {
  const [productosEmpresa, setProductosEmpresa] = useState<Producto[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedValues, setEditedValues] = useState({
    precio: '',
    cantidad: ''
  });
  
  useEffect(() => {
    const fetchData = async () => {
      const productosEmpresa = await productosAPI.buscarProductosEmpresa();
      console.log(productosEmpresa);
      setProductosEmpresa(productosEmpresa);
    }
    fetchData();
  }, []); // Aqui se pone la dependencia para que se ejecute solo una vez
  
  const handleEdit = (producto: Producto) => {
    setEditingId(producto.codigoBarras);
    setEditedValues({
      precio: producto.precio.toString(),
      cantidad: producto.cantidad.toString()
    });
  };
  const handleSaveChanges = async (codigoBarras: string) => {
    try {
      const producto = productosEmpresa.find((producto) => producto.codigoBarras === codigoBarras);
      if (!producto) {
        throw new Error("Producto no encontrado");
      }

      const updatedProducto = {
        ...producto,
        precio: parseFloat(editedValues.precio),
        cantidad: parseInt(editedValues.cantidad),
        ultima_actualizacion: new Date().toISOString()
      };

      await productosAPI.guardarProducto(updatedProducto);
      setProductosEmpresa((prevProductos) => prevProductos.map((producto) => {
        if (producto.codigoBarras === codigoBarras) {
          return updatedProducto;
        }
        return producto;
      }));
      setEditingId(null);
    } catch (error) {
      console.error("Error al guardar cambios:", error);
    }
  }

  return (
    <div className="bg-gray-50 text-gray-900 dark:text-white dark:bg-gray-900 min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Productos</h1>
      <TablaProducto
        productos={productosEmpresa}
        editingId={editingId}
        editedValues={editedValues}
        onEdit={handleEdit}
        onSave={handleSaveChanges}
        onEditValues={(values) => setEditedValues({ ...editedValues, ...values })}
      />
    </div>
  );
}

export default Productos;