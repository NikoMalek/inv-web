import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

transporter.verify().then(() => { 
  console.log('Listo para enviar correo'); 
}).catch((error) => { 
  console.log('Error al verificar el correo', error); 
});

export default transporter;