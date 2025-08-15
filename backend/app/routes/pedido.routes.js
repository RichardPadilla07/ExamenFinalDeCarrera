const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedido.controller');

router.get('/', pedidoController.getAll);
router.post('/', pedidoController.create);
router.put('/:id', pedidoController.update);
router.delete('/:id', pedidoController.delete);

module.exports = router;
