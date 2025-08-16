const Carrito = require('../models/carrito');

exports.getAllCarritos = async (req, res) => {
    try {
        const carritos = await Carrito.findAll();
        res.json(carritos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCarritoById = async (req, res) => {
    try {
        const carrito = await Carrito.findByPk(req.params.id);
        if (!carrito) return res.status(404).json({ error: 'Carrito no encontrado' });
        res.json(carrito);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createCarrito = async (req, res) => {
    try {
        const nuevoCarrito = await Carrito.create(req.body);
        res.status(201).json(nuevoCarrito);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateCarrito = async (req, res) => {
    try {
        const carrito = await Carrito.findByPk(req.params.id);
        if (!carrito) return res.status(404).json({ error: 'Carrito no encontrado' });
        await carrito.update(req.body);
        res.json(carrito);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteCarrito = async (req, res) => {
    try {
        const carrito = await Carrito.findByPk(req.params.id);
        if (!carrito) return res.status(404).json({ error: 'Carrito no encontrado' });
        await carrito.destroy();
        res.json({ message: 'Carrito eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
