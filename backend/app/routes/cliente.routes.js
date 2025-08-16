
const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/cliente.controller');

router.get('/:cedula', clienteController.getByCedula);

router.get('/', clienteController.getAll);
router.post('/', clienteController.create);
router.put('/:cedula', clienteController.update);
router.delete('/:cedula', clienteController.delete);

module.exports = router;
