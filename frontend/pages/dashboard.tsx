import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

interface UserData {
  nombre: string;
  id: string; // Asegúrate de que sea un string si el ID es un string
  nombre_empresa: string;
  idEmpresa: string;
}

export default function Welcome({ userData }: { userData: UserData }) {
  const router = useRouter();

  async function handleLogout() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/logout`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.status === 200) {
        router.push('/login');
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
    return <div></div>; // O mostrar un loading
  }

  return (
    <div className="flex h-screen w-screen">
      <div className="flex-grow bg-gray-50 dark:bg-gray-900 transition-opacity duration-300">
        {/* Contenido que se oscurece */}
        <div className="flex h-screen w-screen items-center justify-center">
          <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-lg dark:border-gray-700 text-center bg-white dark:bg-gray-800">
            <div className="flex flex-col items-center justify-center space-y-5 border-b border-gray-200 px-6 py-8 dark:border-gray-600">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Bienvenido{userData.nombre ? `, ${userData.nombre}` : ''}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                ID del usuario: <span className="font-medium">{userData.id}</span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                ID de la empresa: <span className="font-medium">{userData.idEmpresa}</span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Nombre de la empresa: <span className="font-medium">{userData.nombre_empresa}</span>
              </p>
              <button
                onClick={() => router.push('/registro')}
                className="p-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
              >
                Escanear código de barras
              </button>
              {/* <button
                onClick={handleLogout}
                className="mt-4 p-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300"
              >
                Cerrar sesión
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
