import React, { useState } from 'react';
import RUT from 'rut-chile';

export function Form({
  action,
  children,
  isRegister,
  
}: {
  action: any;
  children: React.ReactNode;
  isRegister?: boolean;
  className?: string;  // Agregamos la propiedad className
}) {
  const [rut, setRut] = useState<string>('');
  const [rutError, setRutError] = useState<string>('');

  const handleRutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.toUpperCase();
    value = value.replace(/[^0-9K]/g, '');
  
    if (value.includes('K') && value.indexOf('K') !== value.length - 1) {
      value = value.replace(/K/g, '');
    }
  
    const formattedRut = RUT.format(value, false, true);
    setRut(formattedRut);

  };

  const handleRutBlur = () => {
    if (rut) {
      const isValid = RUT.validate(rut);
      setRutError(isValid ? '' : 'Formato de RUT inválido');
      if (isValid) {
        console.log('RUT:', RUT.format(rut));
        setRut(RUT.format(rut, false, true));
      }
    }
  };
  return (
    <form
      action={action}
      className="flex flex-col space-y-4 bg-gray-50 dark:bg-gray-900 px-4 py-8 sm:px-16"
    >
      {isRegister && (
      <div className="flex flex-col space-y-4">
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label
            htmlFor="firstName"
            className="block text-xs text-gray-600 dark:text-gray-400 uppercase"
            >
            Nombres
            </label>
            <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="Juan"
            required
            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:border-black dark:focus:border-white focus:outline-none focus:ring-black dark:focus:ring-white sm:text-sm text-black"
            />
          </div>
          <div className="w-1/2">
            <label
            htmlFor="lastName"
            className="block text-xs text-gray-600 dark:text-gray-400 uppercase"
            >
            Apellido
            </label>
            <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Perez"
            required
            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:border-black dark:focus:border-white focus:outline-none focus:ring-black dark:focus:ring-white sm:text-sm text-black"
            />
          </div>
        </div>
        <div>
        <label
          htmlFor="rut"
          className="block text-xs text-gray-600 dark:text-gray-400"
        >
          RUT (Sin puntos ni guión)
        </label>
        <input
          id="rut"
          name="rut"
          type="text"
          placeholder="123456789"
          value={rut}
          onChange={handleRutChange}
          // onChange={(e) => setRut(e.target.value)}
          onBlur={handleRutBlur}
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:border-black dark:focus:border-white focus:outline-none focus:ring-black dark:focus:ring-white sm:text-sm text-black"
        />
        {rutError && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{rutError}</p>
        )}
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-xs text-gray-600 dark:text-gray-400 uppercase"
          >
            Teléfono
          </label>
          <div className="mt-1 relative">
            <input
              id="phone"
              name="phone"
              type="text"
              placeholder="912345678"
              required
              pattern="\d*"
              onInput={(e) => {
                const input = e.target as HTMLInputElement;
                input.value = input.value.replace(/\D/g, '').slice(0,9);
              }}
              inputMode="numeric" 
              className="block w-full pl-12 pr-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm text-black"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-gray-900 sm:text-sm font-semibold text-lg">+56</span>
            </div>
          </div>
        </div>
        {/* Datos empresa */}
        <div>
          <label
            htmlFor="company"
            className="block text-xs text-gray-600 dark:text-gray-400 uppercase"
          >
            Empresa
          </label>
          <input
            id="company"
            name="company"
            type="text"
            placeholder="ACME Inc."
            required
            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:border-black dark:focus:border-white focus:outline-none focus:ring-black dark:focus:ring-white sm:text-sm text-black"
          />
          </div>
          <div>
          <label
            htmlFor="address"
            className="block text-xs text-gray-600 dark:text-gray-400 uppercase"
          >
            Dirección
          </label>
          <input
            id="address"
            name="address"
            type="text"
            placeholder="Calle 123"
            required
            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:border-black dark:focus:border-white focus:outline-none focus:ring-black dark:focus:ring-white sm:text-sm text-black"
          />
          </div>
      </div>
      )}

      <div>
      <label
        htmlFor="email"
        className="block text-xs text-gray-600 dark:text-gray-400 uppercase"
      >
        Correo electrónico
      </label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="user@acme.com"
        autoComplete="email"
        required
        className="mt-1 block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:border-black dark:focus:border-white focus:outline-none focus:ring-black dark:focus:ring-white sm:text-sm text-black"
      />
      </div>
      <div>
      <label
        htmlFor="password"
        className="block text-xs text-gray-600 dark:text-gray-400 uppercase"
      >
        Contraseña
      </label>
      <input
        id="password"
        name="password"
        type="password"
        required
        className="mt-1 block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:border-black dark:focus:border-white focus:outline-none focus:ring-black dark:focus:ring-white sm:text-sm text-black"
      />
      </div>
      {children}
    </form>
  );
}