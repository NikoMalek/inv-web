import express from 'express';
import { InventarioDB } from '../services/inventario-db.js';

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const { ID_EMPRESA } = req.body;
    const productos = await InventarioDB.get({ ID_EMPRESA });
    res.json(productos);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

export default router;
  