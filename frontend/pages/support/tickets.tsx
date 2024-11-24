import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

interface Ticket {
  id: number;
  asunto: string;
  descripcion: string;
  estado: string;
  fechaCreacion: string;
}

export default function SupportTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newTicket, setNewTicket] = useState({ asunto: '', descripcion: '' });
  const router = useRouter();

  useEffect(() => {
    async function fetchTickets() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/support/tickets`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Error al obtener los tickets de soporte.');
        }

        const data = await response.json();
        setTickets(data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
        MySwal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo cargar la información de los tickets.',
          confirmButtonText: 'Aceptar',
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchTickets();
  }, []);

  const handleNewTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicket.asunto || !newTicket.descripcion) {
      MySwal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Todos los campos son requeridos.',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/ticket`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTicket),
        credentials: 'include',
      });

      if (!response.ok) {
        console.log('Error creating ticket:', response);
        throw new Error('Error al crear el ticket.');
      }

      const data = await response.json();
      console.log('Ticket created:', data);
      setTickets((prev) => [...prev, data]);
      setNewTicket({ asunto: '', descripcion: '' });
      MySwal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Ticket creado con éxito.',
        confirmButtonText: 'Aceptar',
      });
    } catch (error) {
      console.error('Error creating ticket:', error);
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo crear el ticket.',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader">Cargando...</div> {/* Aquí puedes usar un spinner o loader */}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-white my-6">Tickets de Soporte</h1>
      
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg dark:bg-gray-800">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Mis Tickets</h2>
        
        <ul className="space-y-4 mt-4">
          {tickets.map((ticket) => (
            <li key={ticket.id} className="border p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">{ticket.asunto}</h3>
              <p className="text-gray-700 dark:text-gray-300">{ticket.descripcion}</p>
              <p className="text-gray-500 dark:text-gray-400">Estado: {ticket.estado}</p>
              <p className="text-gray-500 dark:text-gray-400">Fecha: {new Date(ticket.fechaCreacion).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>

        <form className="mt-8" onSubmit={handleNewTicketSubmit}>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Crear Nuevo Ticket</h2>
          <div className="mt-4">
            <label className="block text-gray-700 dark:text-gray-300" htmlFor="asunto">Asunto</label>
            <input
              type="text"
              id="asunto"
              value={newTicket.asunto}
              onChange={(e) => setNewTicket({ ...newTicket, asunto: e.target.value })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 dark:text-gray-300" htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              value={newTicket.descripcion}
              onChange={(e) => setNewTicket({ ...newTicket, descripcion: e.target.value })}
              className="mt-1 block w-full p-2 border border-gray-300 bg-white text-gray-900 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              rows={4}
              required
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
            >
              Enviar Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
