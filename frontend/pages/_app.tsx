import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import { useDarkMode } from '../lib/useDarkMode';
import '../app/globals.css';
import NavbarSidebar from '../components/NavbarSidebar';
import { indexedDBService } from '../services/indexedDB';

const publicRoutes = ['/', '/auth/login', '/auth/register', '/auth/forgot-password'];

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<{ id: string; nombre: string; idEmpresa: string; nombre_empresa: string } | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);  // Añadir estado para el sidebar
  const router = useRouter();
  const { isDarkMode, toggleDarkMode } = useDarkMode(); 

  useEffect(() => {
    indexedDBService.initDB().catch(console.error);
  }, []);


  const checkAuth = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/protected`, { credentials: 'include' });
      if (response.status === 200) {
        const data = await response.json();
        setIsAuthenticated(true);
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
      router.push('/auth/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <div></div>; 
  }

  if (publicRoutes.includes(router.pathname)) {
    return (
      <div className={isDarkMode ? 'dark' : ''}>
        <Component {...pageProps} isAuthenticated={isAuthenticated} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} checkAuth={checkAuth} />
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
        isLoggedIn={isAuthenticated ?? false}
        nombre={userData?.nombre || ''}
        nombreEmpresa={userData?.nombre_empresa || ''}
        toggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
        isSidebarOpen={isSidebarOpen} // Pasar el estado del sidebar
        setIsSidebarOpen={setIsSidebarOpen} // Pasar la función para actualizar el estado
      />

      {/* Ajuste del contenido dependiendo del estado del sidebar */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'} md:ml-64`}>
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
