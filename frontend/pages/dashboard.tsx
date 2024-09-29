import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import NavbarSidebar from '../components/NavbarSidebar'; // Importamos el NavbarSidebar

const MySwal = withReactContent(Swal);

interface UserData {
  nombre: string;
  id: string;
  nombre_empresa: string;
  idEmpresa: string;
}

export default function Dashboard({ userData, isDarkMode, toggleDarkMode }: { userData: UserData, isDarkMode: boolean, toggleDarkMode: () => void }) {
  const router = useRouter();

  async function handleLogout() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/logout`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.status === 200) {
        router.push('/auth/login');
      } else {
        throw new Error('No se pudo cerrar sesión');
      }
    } catch (error) {
      console.error('Error logging out:', (error as Error).message);
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo cerrar sesión.',
        confirmButtonText: 'Aceptar',
      });
    }
  }

  if (!userData) {
    return <div>Cargando...</div>; // O algún tipo de spinner
  }

  return (
    <div className={`${isDarkMode ? 'dark' : ''} flex h-screen`}>
      <div className="flex-grow bg-gray-100 dark:bg-gray-900 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-white">
            Bienvenido, {userData.nombre}
          </h1>
          <div className="bg-white dark:bg-gray-800 p-6 shadow-md rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Información del Usuario</h2>
            <p className="mb-2">Usuario: <span className="font-bold">{userData.nombre}</span></p>
            <p className="mb-2">ID Empresa: <span className="font-bold">{userData.idEmpresa}</span></p>
            <p className="mb-2">Nombre de la Empresa: <span className="font-bold">{userData.nombre_empresa}</span></p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
              <h3 className="text-lg font-bold">Escanear Código de Barras</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Registra productos rápidamente.
              </p>
              <button
                onClick={() => router.push('/registroInventario')}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
              >
                Escanear
              </button>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
              <h3 className="text-lg font-bold">Ver Productos</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Administra todos los productos registrados.
              </p>
              <button
                onClick={() => router.push('/products')}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300"
              >
                Ver productos
              </button>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
              <h3 className="text-lg font-bold">Informes</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Consulta estadísticas y reportes.
              </p>
              <button
                onClick={() => router.push('/reports')}
                className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600 transition duration-300"
              >
                Ver informes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
