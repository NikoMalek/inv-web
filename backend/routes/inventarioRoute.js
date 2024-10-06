import express from 'express';
import { InventarioDB } from '../services/inventario-db.js';

const router = express.Router();


router.get('/', async (req, res) => {
  const user = req.user
  console.log(user)
  try {
    const { idEmpresa } = user;
    const productos = await InventarioDB.get({ id_empresa: idEmpresa });
    
    console.log(productos)
    res.json(productos);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

export default router;
  