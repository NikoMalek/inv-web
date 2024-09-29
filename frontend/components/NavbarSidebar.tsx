import { useState } from "react";
import Link from "next/link";
import { FaChevronRight, FaChevronLeft, FaUser, FaCog, FaHeadset, FaTachometerAlt, FaBox, FaTags, FaChartLine, FaSignOutAlt } from 'react-icons/fa';

interface NavbarSidebarProps {
  isLoggedIn: boolean;
  nombre: string;
  nombreEmpresa: string;
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const NavbarSidebar: React.FC<NavbarSidebarProps> = ({
  isLoggedIn,
  nombre,
  nombreEmpresa,
  toggleDarkMode,
  isDarkMode,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isSidebarOpen) {
      setIsSidebarOpen(false); // Cierra el sidebar si está abierto
    }
  };
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (isMenuOpen) {
      setIsMenuOpen(false); // Cierra el menú si está abierto
    }
  };

  const toggleSidebarCollapse = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  return (
    <div className={`relative ${isDarkMode ? 'dark' : ''}`}>
      {/* Navbar */}
      <nav className={`bg-blue-700 dark:bg-gray-800 text-white shadow-lg fixed w-full z-30 top-0`}>
        <div className="container mx-auto p-4 flex justify-between items-center">
          <button 
            aria-label="Toggle Sidebar" 
            className="md:hidden text-white" 
            onClick={toggleSidebar}
          >
            ☰
          </button>

          <div className="flex items-center">
            <img src="/img/logo.png" alt="Logo" className="h-10" />
            <span className="ml-2 font-bold text-xl">{nombreEmpresa}</span>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <span className="text-sm">Hola, {nombre}</span>
                <Link href="/auth/logout" className="flex items-center hover:text-gray-300 dark:hover:text-gray-400 transition duration-200">
                  <FaSignOutAlt className="mr-1" /> {/* Icono de salida */}
                  <span className="font-medium">Cerrar Sesión</span> {/* Texto más destacado */}
                </Link>
              </>
            ) : (
              <Link href="/auth/login" className="hover:text-gray-300 dark:hover:text-gray-400 transition duration-200">Iniciar Sesión</Link>
            )}
            <button 
              onClick={toggleDarkMode} 
              className="hover:text-gray-300 dark:hover:text-gray-400 transition duration-200" 
              aria-label={isDarkMode ? "Activar modo claro" : "Activar modo oscuro"}
            >
              {isDarkMode ? "🌞 Modo Claro" : "🌙 Modo Oscuro"}
            </button>
          </div>

          <button 
            aria-label="Toggle Menu" 
            className="md:hidden text-white ml-4" 
            onClick={toggleMenu}
          >
            ☰
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-blue-700 dark:bg-gray-800 p-4 space-y-2">
            {isLoggedIn ? (
              <Link href="/auth/logout" className="flex items-center text-white hover:text-gray-300 dark:hover:text-gray-400">
                <FaSignOutAlt className="mr-1" />
                <span className="font-medium">Cerrar Sesión</span>
              </Link>
            ) : (
              <Link href="/auth/login" className="block text-white hover:text-gray-300 dark:hover:text-gray-400">Iniciar Sesión</Link>
            )}
            <button 
              onClick={toggleDarkMode} 
              className="block text-white mt-2" 
              aria-label={isDarkMode ? "Activar modo claro" : "Activar modo oscuro"}
            >
              {isDarkMode ? "🌞 Modo Claro" : "🌙 Modo Oscuro"}
            </button>
          </div>
        )}
      </nav>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 ${isSidebarCollapsed ? 'w-16' : 'w-48'} bg-blue-700 dark:bg-gray-800 text-white p-4 transition-transform duration-300 ease-in-out z-20 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-xl font-bold ${isSidebarCollapsed ? 'hidden' : 'block'}`}>Menú</h2>
          <button 
            className="text-white md:hidden" 
            aria-label="Cerrar Sidebar" 
            onClick={toggleSidebar}
          >
            ✖️
          </button>
          <button 
            className="text-white" 
            aria-label="Colapsar Sidebar" 
            onClick={toggleSidebarCollapse}
          >
            {isSidebarCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </button>
        </div>
        <nav className="flex flex-col space-y-4 mt-10">
          {[{ href: "/dashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
            { href: "/products", icon: <FaBox />, label: "Productos" },
            { href: "/categories", icon: <FaTags />, label: "Categorías" },
            { href: "/reports", icon: <FaChartLine />, label: "Informes" },
            { href: "/profile/Profile", icon: <FaUser />, label: "Perfil" },
            { href: "/settings", icon: <FaCog />, label: "Configuraciones" },
            { href: "/support", icon: <FaHeadset />, label: "Soporte" },
          ].map(({ href, icon, label }) => (
            <Link href={href} className="hover:bg-blue-800 dark:hover:bg-gray-700 p-2 rounded flex items-center transition duration-200" key={label}>
              {icon}
              {!isSidebarCollapsed && <span className="ml-2">{label}</span>}
            </Link>
          ))} 
        </nav>
      </div>

      {/* Overlay para oscurecer el fondo */}
      {/* {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10" 
          onClick={toggleSidebar} 
          aria-label="Cerrar Sidebar"
        ></div>
      )} */}
    </div>
  );
};

export default NavbarSidebar;
