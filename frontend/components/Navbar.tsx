// import { useState, useEffect, FC } from 'react';
// import Link from 'next/link';

// const Navbar: FC<{ isDarkMode: boolean, toggleDarkMode: () => void }> = ({ isDarkMode, toggleDarkMode }) => {
//   const [isOpen, setIsOpen] = useState(false); // Manejar el estado del menú desplegable
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Manejar el estado del sidebar

//   const toggleMenu = () => {
//     setIsOpen(!isOpen); // Alternar el estado de apertura/cierre del menú móvil
//   };

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen); // Alternar el sidebar
//   };

//   useEffect(() => {
//     // Aquí puedes agregar cualquier lógica que quieras ejecutar al montar el componente
//   }, []);

//   return (
//     <div className={`relative ${isDarkMode ? 'dark' : ''}`}>
//       {/* Sidebar */}
//       <aside
//         className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white transition-transform duration-300 ease-in-out z-30 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
//       >
//         <div className="p-4">
//           <h2 className={`text-xl font-bold mb-4 ${isSidebarOpen ? '' : 'hidden'}`}>Menú</h2>
//           <nav className="flex flex-col space-y-4">
//             <Link href="/" className="flex items-center hover:bg-gray-700 px-3 py-2 rounded">
//               <span className="text-2xl">{isSidebarOpen ? '🏠' : '🏠'}</span>
//               <span className={`ml-2 ${isSidebarOpen ? 'block' : 'hidden'}`}>Home</span>
//             </Link>
//             <Link href="/dashboard" className="flex items-center hover:bg-gray-700 px-3 py-2 rounded">
//               <span className="text-2xl">{isSidebarOpen ? '📊' : '📊'}</span>
//               <span className={`ml-2 ${isSidebarOpen ? 'block' : 'hidden'}`}>Dashboard</span>
//             </Link>
//             <Link href="/login" className="flex items-center hover:bg-gray-700 px-3 py-2 rounded">
//               <span className="text-2xl">{isSidebarOpen ? '🔑' : '🔑'}</span>
//               <span className={`ml-2 ${isSidebarOpen ? 'block' : 'hidden'}`}>Login</span>
//             </Link>
//             <Link href="/register" className="flex items-center hover:bg-gray-700 px-3 py-2 rounded">
//               <span className="text-2xl">{isSidebarOpen ? '📝' : '📝'}</span>
//               <span className={`ml-2 ${isSidebarOpen ? 'block' : 'hidden'}`}>Register</span>
//             </Link>
//           </nav>
//         </div>
//       </aside>

//       {/* Overlay for sidebar (click to close) */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-20"
//           onClick={toggleSidebar}
//         ></div>
//       )}

//       {/* Navbar */}
//       <nav className={`p-4 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-blue-600'} z-10`}>
//         <div className="container mx-auto flex justify-between items-center">
//           {/* Sidebar toggle button */}
//           <button 
//             className="text-white focus:outline-none"
//             onClick={toggleSidebar}
//           >
//             {isSidebarOpen ? '✖️' : '☰'}
//           </button>
//           <h1 className="text-2xl font-bold text-white ml-4">Mi Navbar</h1>
          
//           {/* Links for desktop */}
//           <div className="hidden md:flex space-x-4">
//             <Link href="/" className="text-white hover:text-gray-300">Home</Link>
//             <Link href="/dashboard" className="text-white hover:text-gray-300">Dashboard</Link>
//             <Link href="/login" className="text-white hover:text-gray-300">Login</Link>
//             <Link href="/register" className="text-white hover:text-gray-300">Register</Link>
//           </div>

//           <div className="flex md:hidden">
//             {/* Button to toggle mobile menu */}
//             <button 
//               onClick={toggleMenu} 
//               className="text-white focus:outline-none ml-4"
//             >
//               {isOpen ? '✖️' : '☰'}
//             </button>
//           </div>

//           <button
//             onClick={toggleDarkMode}
//             className="ml-4 text-white focus:outline-none"
//           >
//             {isDarkMode ? '🌞 Modo Claro' : '🌙 Modo Oscuro'}
//           </button>
//         </div>

//         {/* Dropdown menu for mobile */}
//         {isOpen && (
//           <div className="md:hidden flex flex-col bg-blue-500 mt-2 rounded-lg shadow-lg z-10">
//             <Link href="/" className="block text-white hover:bg-blue-600 px-4 py-2">Home</Link>
//             <Link href="/dashboard" className="block text-white hover:bg-blue-600 px-4 py-2">Dashboard</Link>
//             <Link href="/login" className="block text-white hover:bg-blue-600 px-4 py-2">Login</Link>
//             <Link href="/register" className="block text-white hover:bg-blue-600 px-4 py-2">Register</Link>
//           </div>
//         )}
//       </nav>
//     </div>
//   );
// };

// export default Navbar;

import { useState, useEffect, FC } from 'react';
import Link from 'next/link';

const Navbar: FC<{ isDarkMode: boolean, toggleDarkMode: () => void }> = ({ isDarkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false); // Manejar el estado del menú desplegable
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Manejar el estado del sidebar

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Alternar el estado de apertura/cierre del menú móvil
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Alternar el sidebar
  };

  useEffect(() => {
    // Aquí puedes agregar cualquier lógica que quieras ejecutar al montar el componente
  }, []);

  return (
    <div className={`relative ${isDarkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white transition-transform duration-300 ease-in-out z-30 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-4 flex justify-between items-center">
          <h2 className={`text-xl font-bold mb-4 ${isSidebarOpen ? '' : 'hidden'}`}>Menú</h2>
          {isSidebarOpen && (
            <button
              className="text-white focus:outline-none"
              onClick={toggleSidebar}
            >
              ✖️
            </button>
          )}
        </div>
        <nav className="flex flex-col space-y-4">
          <Link href="/" className="flex items-center hover:bg-gray-700 px-3 py-2 rounded">
            <span className="text-2xl">{isSidebarOpen ? '🏠' : '🏠'}</span>
            <span className={`ml-2 ${isSidebarOpen ? 'block' : 'hidden'}`}>Home</span>
          </Link>
          <Link href="/dashboard" className="flex items-center hover:bg-gray-700 px-3 py-2 rounded">
            <span className="text-2xl">{isSidebarOpen ? '📊' : '📊'}</span>
            <span className={`ml-2 ${isSidebarOpen ? 'block' : 'hidden'}`}>Dashboard</span>
          </Link>
          <Link href="/login" className="flex items-center hover:bg-gray-700 px-3 py-2 rounded">
            <span className="text-2xl">{isSidebarOpen ? '🔑' : '🔑'}</span>
            <span className={`ml-2 ${isSidebarOpen ? 'block' : 'hidden'}`}>Login</span>
          </Link>
          <Link href="/register" className="flex items-center hover:bg-gray-700 px-3 py-2 rounded">
            <span className="text-2xl">{isSidebarOpen ? '📝' : '📝'}</span>
            <span className={`ml-2 ${isSidebarOpen ? 'block' : 'hidden'}`}>Register</span>
          </Link>
        </nav>
      </aside>

      {/* Overlay for sidebar (click to close) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Navbar */}
      <nav className={`p-4 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-blue-600'} z-10`}>
        <div className="container mx-auto flex justify-between items-center">
          {/* Sidebar toggle button */}
          <button 
            className="text-white focus:outline-none"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? '☰' : '☰'}
          </button>
          {/* <h1 className="text-2xl font-bold text-white ml-4">Mi Navbar</h1> */}
          <img src="/img/logo.png" alt="Logo de la Empresa" className="h-10" />
          {/* Links for desktop */}
          <div className="hidden md:flex space-x-4">
            <Link href="/" className="text-white hover:text-gray-300">Home</Link>
            <Link href="/dashboard" className="text-white hover:text-gray-300">Dashboard</Link>
            <Link href="/login" className="text-white hover:text-gray-300">Login</Link>
            <Link href="/register" className="text-white hover:text-gray-300">Register</Link>
          </div>

          <div className="flex md:hidden">
            {/* Button to toggle mobile menu */}
            <button 
              onClick={toggleMenu} 
              className="text-white focus:outline-none ml-4"
            >
              {isOpen ? '✖️' : '☰'}
            </button>
          </div>

          <button
            onClick={toggleDarkMode}
            className="ml-4 text-white focus:outline-none"
          >
            {isDarkMode ? '🌞 Modo Claro' : '🌙 Modo Oscuro'}
          </button>
        </div>

        {/* Dropdown menu for mobile */}
        {isOpen && (
          <div className="md:hidden flex flex-col bg-blue-500 mt-2 rounded-lg shadow-lg z-10">
            <Link href="/" className="block text-white hover:bg-blue-600 px-4 py-2">Home</Link>
            <Link href="/dashboard" className="block text-white hover:bg-blue-600 px-4 py-2">Dashboard</Link>
            <Link href="/login" className="block text-white hover:bg-blue-600 px-4 py-2">Login</Link>
            <Link href="/register" className="block text-white hover:bg-blue-600 px-4 py-2">Register</Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;

