import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Loading from './loading'; // Importa el componente Loading

const MySwal = withReactContent(Swal);

interface UserProfile {
  nombre: string;
  apellido: string;
  rut: string;
  telefono: string;
  nombre_empresa: string;
  direccion: string;
  email: string;
  profileImage?: string; // Opción para agregar la imagen de perfil
}

export default function Profile() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/perfil`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Error al obtener los datos del perfil.');
        }

        const data = await response.json();
        setUserProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        MySwal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo cargar la información del perfil.',
          confirmButtonText: 'Aceptar',
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfile();
  }, []);

  if (isLoading) {
    return <Loading />; // Usa el componente Loading
  }

  if (!userProfile) {
    return (
      <div className="flex justify-center items-center h-screen">
        No se encontró información de perfil.
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg dark:bg-gray-800">
        <div className="flex flex-col items-center mb-6">
          <img
            src={userProfile.profileImage || '/img/logo.png'}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-blue-600 mb-4"
          />
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">{userProfile.nombre} {userProfile.apellido}</h1>
          <h2 className="text-lg text-gray-600 dark:text-gray-300">{userProfile.email}</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">RUT:</span>
            <span className="text-gray-900 dark:text-white">{userProfile.rut}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Teléfono:</span>
            <span className="text-gray-900 dark:text-white">{userProfile.telefono}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Nombre de la empresa:</span>
            <span className="text-gray-900 dark:text-white">{userProfile.nombre_empresa}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Dirección de la empresa:</span>
            <span className="text-gray-900 dark:text-white">{userProfile.direccion}</span>
          </div>
        </div>

        <div className="mt-8">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
            onClick={() => router.push('/edit-profile')}
          >
            Editar perfil
          </button>
        </div>
      </div>
    </div>
  );
}