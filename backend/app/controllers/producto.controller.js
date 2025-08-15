const db = require('../models/db');

exports.getAll = (req, res) => {
  db.query('SELECT * FROM productos', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.create = (req, res) => {
  const { nombre, codigo, descripcion, categoria, precio, stock, fecha_ingreso, proveedor } = req.body;
  db.query('INSERT INTO productos (nombre, codigo, descripcion, categoria, precio, stock, fecha_ingreso, proveedor) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [nombre, codigo, descripcion, categoria, precio, stock, fecha_ingreso, proveedor],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      // Consultar el producto recién insertado y devolverlo completo
      db.query('SELECT * FROM productos WHERE id = ?', [result.insertId], (err2, rows) => {
        if (err2) return res.status(500).json({ error: err2 });
        res.json(rows[0]);
      });
    });
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { nombre, codigo, descripcion, categoria, precio, stock, fecha_ingreso, proveedor } = req.body;
  db.query('UPDATE productos SET nombre=?, codigo=?, descripcion=?, categoria=?, precio=?, stock=?, fecha_ingreso=?, proveedor=? WHERE id=?',
    [nombre, codigo, descripcion, categoria, precio, stock, fecha_ingreso, proveedor, id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id, nombre, codigo });
    });
};

exports.delete = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM productos WHERE id=?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Producto eliminado' });
  });
};
