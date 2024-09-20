import express from 'express';
const router = express.Router();

// Simular guardar productos en una base de datos

router.post('/', (req, res) => {
  const {nombre , cogidoBarras, cantidad, imagen} = req.body;
  console.log(req.body);
  res.status(201).json({ message: 'Producto guardado con éxito', producto: req.body });
});


// Se puede prorbar en postman enviando un GET a http://localhost:3000/productos/123456789
router.get('/:codigoBarras', (req, res) => {
  const { codigoBarras } = req.params;
  console.log(req.params);
  res.json({ codigoBarras });
});


export default router;
  