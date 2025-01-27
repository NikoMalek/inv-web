import React from "react";
import RegistroProductos from "../components/registroproducto";
import { productosAPI } from '@/services/productos';

interface UserData {
  userData: {
    id: string;
    idEmpresa: string;
  };
}

const App: React.FC<UserData> = ({ userData }) => {

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 flex flex-col justify-start items-center overflow-auto h-screen ">
      <div className="container max-w-4xl mx-auto p-6 mt-12">
        <RegistroProductos

          onGuardarProducto={(producto) => productosAPI.guardarProducto({ ...producto, id_empresa: userData.idEmpresa, id_reponedor: userData.id })}
          buscarProductoLocal={productosAPI.buscarProducto}
          buscarProductosEmpresa={productosAPI.buscarProductosEmpresa}
        />
      </div>
    </div>
  );
};

export default App;
