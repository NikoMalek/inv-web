import { z } from 'zod';

const errorMessages = {
  nombreVacio: 'El nombre no puede estar vacío',
  nombreLargo: 'El nombre no puede exceder los 50 caracteres',
  apellidoVacio: 'El apellido no puede estar vacío',
  apellidoLargo: 'El apellido no puede exceder los 50 caracteres',
  rutVacio: 'El RUT no puede estar vacío',
  rutLargo: 'El RUT no puede exceder los 12 caracteres',
  emailInvalido: 'El correo electrónico debe ser válido',
  emailVacio: 'El correo electrónico no puede estar vacío',
  passwordCorta: 'La contraseña debe tener al menos 3 caracteres',
  passwordLarga: 'La contraseña no puede exceder los 20 caracteres',
  passwordIncorrecta: 'La contraseña es incorrecta',
  emailRegistrado: 'El correo electrónico ya esta registrado',
  emailNoExiste: 'El correo electrónico no existe',
  rutInvalido: 'El RUT no es valido',
  nombreEmpresaVacio: 'El nombre de la empresa no puede estar vacío',
  nombreEmpresaLargo: 'El nombre de la empresa no puede exceder los 50 caracteres',
  direccionVacia: 'La dirección de la empresa no puede estar vacía',
  direccionLarga: 'La dirección de la empresa no puede exceder los 50 caracteres',
  productoRegistrado: 'El producto ya esta registrado',
  productoNoExiste: 'El producto no existe',
};

const userSchema = z.object({
  nombre: z.string().min(1, errorMessages.nombreVacio).max(50, errorMessages.nombreLargo),
  apellido: z.string().min(1, errorMessages.apellidoVacio).max(50, errorMessages.apellidoLargo),
  rut: z.string().min(1, errorMessages.rutVacio).max(12, errorMessages.rutLargo),
  email: z.string().email(errorMessages.emailInvalido).min(1, errorMessages.emailVacio),
  password: z.string().min(3, errorMessages.passwordCorta).max(20, errorMessages.passwordLarga),
});

const empresaSchema = z.object({
  nombre_empresa: z.string().min(1, errorMessages.nombreEmpresaVacio).max(50, errorMessages.nombreEmpresaLargo),
  direccion: z.string().min(1, errorMessages.direccionVacia).max(50, errorMessages.direccionLarga),
});

export { errorMessages, userSchema, empresaSchema };