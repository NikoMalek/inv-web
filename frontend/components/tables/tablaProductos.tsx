import React from "react";

interface Producto {
  nombre: string;
  codigoBarras: string;
  cantidad: number;
  imagen?: string;
  precio: number;
  ultima_actualizacion: string;
}

interface TablaProductoProps {
  productos: Producto[];
  editingId: string | null;
  editedValues: {
    precio: string;
    cantidad: string;
  };
  onEdit: (producto: Producto) => void;
  onSave: (codigoBarras: string) => void;
  onEditValues: (values: { precio?: string; cantidad?: string }) => void;
}

const TablaProducto: React.FC<TablaProductoProps> = ({
  productos,
  editingId,
  editedValues,
  onEdit,
  onSave,
  onEditValues,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-gray-900 dark:text-white">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-24">Imagen</th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nombre</th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Código de Barras</th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Precio</th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Cantidad</th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-20">Editar</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {productos?.map((producto) => (
            <tr key={producto.codigoBarras}>
              <td className="px-6 py-4 whitespace-nowrap">
                <img src={producto.imagen} alt={producto.nombre} className="w-20 h-20 object-contain rounded-md" />
              </td>
              <td className="px-6 py-4 max-w-[50%] break-words text-center">{producto.nombre}</td>
              <td className="px-6 py-4 whitespace-nowrap text-center">{producto.codigoBarras}</td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                {editingId === producto.codigoBarras ? (
                  <input
                    type="number"
                    value={editedValues.precio}
                    onChange={(e) => onEditValues({ precio: e.target.value })}
                    className="w-20 p-1 border rounded dark:text-gray-900"
                  />
                ) : (
                  producto.precio
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                {editingId === producto.codigoBarras ? (
                  <input
                    type="number"
                    value={editedValues.cantidad}
                    onChange={(e) => onEditValues({ cantidad: e.target.value })}
                    className="w-20 p-1 border rounded dark:text-gray-900"
                  />
                ) : (
                  producto.cantidad
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                {editingId === producto.codigoBarras ? (
                  <button 
                    onClick={() => onSave(producto.codigoBarras)}
                    className="p-2 w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-lg"
                  >
                    ✓
                  </button>
                ) : (
                  <button 
                    onClick={() => onEdit(producto)}
                    className="p-2 w-8 h-8 flex items-center justify-center bg-gray-800 dark:bg-gray-300 rounded-lg"
                  >
                    🖊️
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaProducto;