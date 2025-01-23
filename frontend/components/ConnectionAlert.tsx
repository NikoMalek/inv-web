import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { productosAPI } from '@/services/productos';

const ConnectionAlert = () => {
  useEffect(() => {
    let toast: any = null;

    const showOnlineAlert = () => {
      Swal.fire({
        title: '¡Conexión restaurada!',
        text: 'Tienes conexión a internet',
        icon: 'success',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      });
    };

    const showOfflineAlert = () => {
      toast = Swal.fire({
        title: '¡Sin conexión!',
        text: 'Verifica tu conexión a internet',
        icon: 'warning',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 0, // No se cerrará automáticamente
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      });
    };

    const handleOnline = async () => {
      console.log('🟢 Conexión a Internet disponible');
      if (toast) {
        toast.close();
      }
      showOnlineAlert();
      await productosAPI.sincronizarProductosPendientes();
    };

    const handleOffline = () => {
      console.log('🔴 Sin conexión a Internet');
      showOfflineAlert();
    };

    // Mostrar alerta inicial si no hay conexión
    if (!navigator.onLine) {
      showOfflineAlert();
    }

    // Añadir los event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Limpiar los event listeners
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return null; // Este componente no renderiza nada visualmente
};

export default ConnectionAlert;