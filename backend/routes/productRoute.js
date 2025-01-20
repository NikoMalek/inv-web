import express from 'express';
import { ProductDB } from '../services/products-db.js';


const router = express.Router();

// Simular guardar productos en una base de datos

router.post('/', async (req, res) => {
  try {
    const id_empresa = req.body.id_empresa || req.user?.idEmpresa;
    console.log(req.body)
    const { nombre, description, imagen, codigoBarras, precio, cantidad, ultima_actualizacion, id_reponedor } = req.body;
    const id = await ProductDB.create({ nombre, description, imagen, codigoBarras, id_empresa, precio, cantidad, ultima_actualizacion, id_reponedor });
    res.json({ id });
  } catch (error) {
    res.status(400).send(error.message);
  }
});


router.get('/:codigoBarras', async (req, res) => {
  try {
    const { codigoBarras } = req.params;
    const producto = await ProductDB.get({ codigo_barra: codigoBarras });
    res.json(producto);
  } catch (error) {
    res.status(404).send(error.message);
  }
});


export default router;
  