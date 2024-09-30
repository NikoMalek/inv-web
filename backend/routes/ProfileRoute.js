//IMPORTAR WEAS NECESARIAS, EXPRESS, USERDB Y EL ROUTER DE EXPRESS PARA CREAR LAS RUTAS DE LA API DE PERFIL DE USUARIO
//USERDB ES UNA CLASE QUE CONTIENE LOS METODOS PARA OBTENER EL PERFIL DE USUARIO
import express from 'express';
import { UserDB } from '../services/user-db.js';

const router = express.Router();

// Ruta para obtener el perfil del usuario
router.get('/', async (req, res) => {
  try {
    console.log("Este es la respuesta de Profile Route", req.user);
    // Verifica si req.user existe
    if (!req.user) {
      return res.status(401).send('No autorizado'); // o el código de estado que prefieras
    }

    const userId = req.user.id; 
    const userProfile = await UserDB.getProfile(userId); 

    if (!userProfile) {
      return res.status(404).send('Perfil no encontrado');
    }

    res.json(userProfile);
  } catch (error) {
    res.status(500).send(error.message);
  }
  });

  export default router;