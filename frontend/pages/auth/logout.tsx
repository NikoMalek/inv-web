// import { useDarkMode } from '../lib/useDarkMode';  
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Logout = () => {
    const router = useRouter();
  
    useEffect(() => {
      const logout = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/logout`, {
            method: 'GET', // Cambiado a GET
            credentials: 'include',
          });
  
          if (!response.ok) {
            throw new Error('Error al cerrar sesión');
          }
  
          MySwal.fire({
            icon: 'success',
            title: '¡Adiós!',
            text: 'Has cerrado sesión exitosamente.',
            confirmButtonText: 'Aceptar',
          }).then(() => {
            router.push('/auth/login'); // Redirige a la página de login después de cerrar sesión
          });
        } catch (error) {
          console.error('Error al cerrar sesión:', error);
          MySwal.fire({
            icon: 'error',
            title: 'Error',
            text: (error as Error).message,
            confirmButtonText: 'Aceptar',
          });
        }
      };
  
      logout();
    }, [router]);
  
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-900 dark:text-white">Cerrando sesión...</p>
      </div>
    );
  };
  
  export default Logout;