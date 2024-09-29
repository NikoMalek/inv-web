import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import { useDarkMode } from '../lib/useDarkMode';
import '../app/globals.css';

// Importar el NavbarSidebar
import NavbarSidebar from '../components/NavbarSidebar';

const publicRoutes = ['/', '/auth/login', '/auth/register', '/auth/logout'];

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<{ id: string; nombre: string; idEmpresa: string; nombre_empresa: string } | null>(null);
  const router = useRouter();
  const { isDarkMode, toggleDarkMode } = useDarkMode(); // Hook para modo oscuro

  
    const checkAuth = async () => {
      try {
        // if (publicRoutes.includes(router.pathname)) {
        //   setIsLoading(false);
        // }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/protected`, {
          credentials: 'include',
        });

        if (response.status === 200) {
          const data = await response.json();
          setIsAuthenticated(true);
          console.log(data);
          setUserData({ id: data.id, nombre: data.nombre, idEmpresa: data.idEmpresa, nombre_empresa: data.nombre_empresa });
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (!isLoading && isAuthenticated === false && !publicRoutes.includes(router.pathname)) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <div></div>; // Puedes personalizar esta parte con un spinner si prefieres
  }

  
  if (publicRoutes.includes(router.pathname)) {
    return (
      <div className={isDarkMode ? 'dark' : ''}>
        <Component {...pageProps} isAuthenticated={isAuthenticated} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} checkAuth={checkAuth}/>
      </div>
    );
  }

  if (isAuthenticated === false) {
    return null;
  }

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      {/* Renderizamos el NavbarSidebar */}
      <NavbarSidebar
        isLoggedIn={isAuthenticated ?? false} // Autenticación del usuario
        nombre={userData?.nombre || ''} // Nombre del usuario
        nombreEmpresa={userData?.nombre_empresa || ''} // Nombre de la empresa
        toggleDarkMode={toggleDarkMode} // Función para cambiar el modo oscuro
        isDarkMode={isDarkMode} // Estado del modo oscuro
      />

      {/* Renderizamos el contenido de la página */}
      <div className="content">
        <Component
          {...pageProps}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          isAuthenticated={isAuthenticated}
          userData={userData}
        />
      </div>
    </div>
  );
};

export default MyApp;
