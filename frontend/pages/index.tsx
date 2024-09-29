import '../app/globals.css';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface HomeProps {
  isAuthenticated: boolean;
}

export default function Home({ isAuthenticated }: HomeProps) {
  const router = useRouter();

  // Redirecciona automáticamente si el usuario está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex flex-col min-h-screen p-8 sm:p-20 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="absolute top-4 right-4">
        <button
          className="p-2 bg-green-500 text-white hover:bg-green-600 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-full transition-colors"
          onClick={() => router.push(isAuthenticated ? '/dashboard' : '/login')}
        >
          {isAuthenticated ? 'Mi cuenta' : 'Iniciar sesión'}
        </button>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-grow gap-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Sistema de Gestión de Inventarios</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Bienvenido a tu panel de control. Administra tu inventario, productos y órdenes de manera eficiente.
          </p>
        </div>

        {/* Action Buttons */}
      </main>

      {/* Footer */}
      <footer className="flex items-center justify-center gap-4 py-4 text-sm border-t dark:border-gray-700">
        <p>&copy; {new Date().getFullYear()} Sistema de Gestión de Inventarios. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
