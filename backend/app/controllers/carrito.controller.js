const Carrito = require('../models/carrito');

exports.getAllCarritos = (req, res) => {
    Carrito.getAll((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

exports.getCarritoById = (req, res) => {
    Carrito.getById(req.params.id, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }
        res.json(results[0]);
    });
};

exports.createCarrito = (req, res) => {
    Carrito.create(req.body, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Producto agregado al carrito', id: result.insertId });
    });
};

exports.deleteCarrito = (req, res) => {
    Carrito.delete(req.params.id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }
        res.json({ message: 'Carrito eliminado' });
    });
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
