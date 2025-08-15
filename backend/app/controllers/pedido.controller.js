const db = require('../models/db');

exports.getAll = (req, res) => {
  db.query('SELECT * FROM pedidos', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.create = (req, res) => {
  const { codigo, descripcion, id_cliente, id_producto } = req.body;
  db.query('INSERT INTO pedidos (codigo, descripcion, id_cliente, id_producto) VALUES (?, ?, ?, ?)',
    [codigo, descripcion, id_cliente, id_producto],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id: result.insertId, codigo });
    });
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { codigo, descripcion, id_cliente, id_producto } = req.body;
  db.query('UPDATE pedidos SET codigo=?, descripcion=?, id_cliente=?, id_producto=? WHERE id=?',
    [codigo, descripcion, id_cliente, id_producto, id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id, codigo });
    });
};

exports.delete = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM pedidos WHERE id=?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Pedido eliminado' });
  });
};
