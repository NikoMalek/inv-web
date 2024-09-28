# Proyecto

Pasos para instalar y configurar el proyecto.

## Requisitos

- Node.js
- npm o yarn
- [PostgreSQL ](https://www.postgresql.org/download/)(instala también pgAdmin para gestionar la base de datos)

## Instalación

### Clonar el repositorio

```sh
git clone https://github.com/Guztavo21/inv-web.git
cd inv-web
```

### Configuración del Backend
1. Navega al directorio del backend:
    ```sh
    cd backend
    ```
2. Copia el archivo de ejemplo de variables de entorno (`.env.example`) y crea un nuevo archivo `.env`. Luego, coloca los valores necesarios para las variables en este archivo.
3. Instala las dependencias:
    ```sh
    npm install
    ```
4. Inicia el servidor:
    ```sh
    npm run dev
    ```

### Configuración del Frontend
1. Navega al directorio del frontend:
    ```sh
    cd frontend
    ```
2. Copia el archivo de ejemplo de variables de entorno (`.env.local.example`) y crea un nuevo archivo `.env.local`. Luego, agrega los valores necesarios para las variables en este archivo.
3. Instala las dependencias:
    ```sh
    npm install
    ```
4. Inicia la aplicación de frontend:
    ```sh
    npm run dev
    ```

### Configuración de la Base de Datos
1. Abre pgAdmin y conéctate a tu servidor PostgreSQL.
2. Crea una nueva base de datos llamada `inv-web`.
3. Copia el script de la base de datos que se encuentra en el repositorio y ejecútalo en pgAdmin para crear las tablas necesarias en la base de datos `inv-web`.


## Estructura del Proyecto
- `backend/`: Contiene el código del servidor y la configuración de la base de datos.
  - `.env.example`: Archivo de ejemplo para las variables de entorno del backend.
  - `config.js`: Configuración del servidor.
  - `db.js`: Configuración de la base de datos.
  - `index.js`: Punto de entrada del servidor.
  - `models/`: Modelos de la base de datos.
  - `user-db.js`: Archivo relacionado con la gestión de usuarios en la base de datos.
- `frontend/`: Contiene el código del cliente y la configuración de la aplicación React.
  - `.env.local.example`: Archivo de ejemplo para las variables de entorno del frontend.
  - `app/`: Contiene los archivos de la aplicación.
  - `components/`: Componentes reutilizables de React.
  - `lib/`: Librerías y utilidades.
  - `pages/`: Páginas de la aplicación.
  - `public/`: Archivos estáticos.
  - `styles/`: Archivos de estilos.
  - `next.config.mjs`: Configuración de Next.js.
  - `tsconfig.json`: Configuración de TypeScript.
