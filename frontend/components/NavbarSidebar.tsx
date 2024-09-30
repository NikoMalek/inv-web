import { useState, useEffect } from "react";
import Link from "next/link";
import { FaChevronRight, FaChevronLeft, FaUser, FaCog, FaHeadset, FaTachometerAlt, FaBox, FaTags, FaChartLine, FaSignOutAlt, FaSun, FaMoon } from 'react-icons/fa';

interface NavbarSidebarProps {
  isLoggedIn: boolean;
  nombre: string;
  nombreEmpresa: string;
  toggleDarkMode: () => void;
  isDarkMode: boolean;
  isSidebarOpen: boolean; // Añadido
  setIsSidebarOpen: (open: boolean) => void; // Añadido
}

const NavbarSidebar: React.FC<NavbarSidebarProps> = ({
  isLoggedIn,
  nombre,
  nombreEmpresa,
  toggleDarkMode,
  isDarkMode,
  
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  // Toggle para abrir/cerrar sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Toggle para colapsar/expandir sidebar
  const toggleSidebarCollapse = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  useEffect(() => {
    // Para asegurar que al cambiar el tamaño de la ventana, se ajuste el sidebar y el navbar
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileView(false);
        setIsSidebarOpen(true);
      } else {
        setIsMobileView(true);
        setIsSidebarOpen(false);
      }
    };

    handleResize(); // Ejecutar al cargar
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`relative flex ${isDarkMode ? 'dark' : ''}`}>
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
          {/* Siempre visible el contenido extra en navbar */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <span className="text-sm">Hola, {nombre}</span>
                <Link href="/auth/logout" className="flex items-center hover:text-gray-300 dark:hover:text-gray-400 transition duration-200">
                  <FaSignOutAlt className="mr-1" />
                  <span className="font-medium">Cerrar Sesión</span>
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
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 ${isSidebarCollapsed ? 'w-16' : 'w-64'} bg-blue-700 dark:bg-gray-800 text-white p-4 transition-transform duration-300 ease-in-out z-20 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-xl font-bold ${isSidebarCollapsed ? 'hidden' : 'block'}`}>Menú</h2>
          <button className="text-white md:hidden" aria-label="Cerrar Sidebar" onClick={toggleSidebar}>
            ✖️
          </button>
          <button className="text-white" aria-label="Colapsar Sidebar" onClick={toggleSidebarCollapse}>
            {isSidebarCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </button>
        </div>
        <nav className="flex flex-col space-y-4 mt-10 overflow-y-auto h-full">
          {[{ href: "/dashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
            { href: "/products", icon: <FaBox />, label: "Productos" },
            { href: "/categories", icon: <FaTags />, label: "Categorías" },
            { href: "/reports", icon: <FaChartLine />, label: "Informes" },
            { href: "/profile/Profile", icon: <FaUser />, label: "Perfil" },
            { href: "/settings", icon: <FaCog />, label: "Configuraciones" },
            { href: "/support", icon: <FaHeadset />, label: "Soporte" }].map(({ href, icon, label }) => (
            <Link href={href} className="hover:bg-blue-800 dark:hover:bg-gray-700 p-2 rounded flex items-center transition duration-200" key={label}>
              {icon}
              {!isSidebarCollapsed && <span className="ml-2">{label}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {/* Contenido Principal */}
      <main className={`flex-1 p-6 transition-all duration-300 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        {/* Aquí irá el contenido de la página */}
      </main>
    </div>
  );
};

export default NavbarSidebar;
