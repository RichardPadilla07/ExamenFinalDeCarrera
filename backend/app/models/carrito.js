const db = require('./db');

const Carrito = {
    create: (data, callback) => {
        const sql = 'INSERT INTO carrito (id_cliente, id_producto, cantidad, fecha_agregado) VALUES (?, ?, ?, NOW())';
        db.query(sql, [data.id_cliente, data.id_producto, data.cantidad], callback);
    },

    getAll: (callback) => {
        db.query('SELECT * FROM carrito', callback);
    },

    getById: (id, callback) => {
        db.query('SELECT * FROM carrito WHERE id = ?', [id], callback);
    },

    delete: (id, callback) => {
        db.query('DELETE FROM carrito WHERE id = ?', [id], callback);
    }
};

module.exports = Carrito;
