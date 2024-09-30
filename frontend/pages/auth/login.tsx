import Link from 'next/link';
import { Form } from '../../components/form';
import { SubmitButton } from '../../components/submit-button';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useRouter } from 'next/router';
import '../../app/globals.css';

const MySwal = withReactContent(Swal);

interface LoginProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  checkAuth: () => Promise<void>;
}

export default function Login({ isDarkMode, toggleDarkMode, checkAuth }: LoginProps) {
  const router = useRouter();

  async function login(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      console.log('User logged in with ID:', data.user._id);
      if (response.status === 200) {
        await checkAuth();
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      const errorMessage = 
      (error instanceof Error && error.message !== 'El correo electrónico no existe' && error.message !== 'Contraseña Incorrecta') 
          ? 'Error de conexión con el servidor' 
          : (error as Error).message;
      
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        confirmButtonText: "Aceptar",
        customClass: {
          popup: isDarkMode ? 'dark' : '',
        }
      });
    }
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300 ease-in-out">
      {/* Dark mode toggle */}
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleDarkMode}
          className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? '🌞' : '🌜'}
        </button>
      </div>
      
      {/* Login form */}
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 dark:border-gray-600 px-6 py-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Iniciar sesión</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Usa tu correo electrónico y contraseña para iniciar sesión
          </p>
        </div>
        <Form action={login} className="p-6">
          <SubmitButton>Iniciar sesión</SubmitButton>
          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            {"¿No tienes una cuenta? "}
            <Link href="/auth/register" className="font-semibold text-blue-600 hover:underline dark:text-blue-400">
              Regístrate
            </Link>
            {' gratis.'}
          </p>
        </Form>
      </div>
    </div>
  );
}
