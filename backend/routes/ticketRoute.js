import express from 'express';

import transporter from '../services/nodemailer.js';


const router = express.Router();


router.post('/', async (req, res) => {
  try {
    if (!req.body) {
      return res.status(401).send('No autorizado');
    }
    await transporter.sendMail({
      to: 'inventarioweb2@gmail.com',
      subject: req.body.asunto,
      html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #333;">Nuevo Ticket Recibido</h2>
        <h3><strong>Información del usuario:</strong></h3>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr style="background-color: #f2f2f2;">
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Campo</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Valor</th>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;"><strong>ID Usuario</strong></td>
            <td style="border: 1px solid #ddd; padding: 8px;">${req.user.id}</td>
          </tr>
          <tr style="background-color: #f2f2f2;">
            <td style="border: 1px solid #ddd; padding: 8px;"><strong>Nombre</strong></td>
            <td style="border: 1px solid #ddd; padding: 8px;">${req.user.nombre} ${req.user.apellido}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;"><strong>Email</strong></td>
            <td style="border: 1px solid #ddd; padding: 8px;">${req.user.email}</td>
          </tr>
        </table>
        <h3><strong>Descripción del ticket:</strong></h3>
        <p style="border: 1px solid #ddd; padding: 8px; background-color: #f9f9f9;">${req.body.descripcion}</p>
      </div>
    `,
  });

    res.status(200).json('Correo enviado exitosamente');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json('Error al enviar el correo');
  }
});

export default router;