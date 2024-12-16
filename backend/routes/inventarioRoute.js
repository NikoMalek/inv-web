import express from 'express';
import { InventarioDB } from '../services/inventario-db.js';

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const { id_empresa } = req.body;
    const productos = await InventarioDB.get({ id_empresa });
    res.json(productos);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

export default router;
  