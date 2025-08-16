exports.getByCedula = (req, res) => {
  const { cedula } = req.params;
  db.query('SELECT * FROM clientes WHERE cedula=?', [cedula], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json(results[0]);
  });
};
const db = require('../models/db');

exports.getAll = (req, res) => {
  db.query('SELECT * FROM clientes', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.create = (req, res) => {
  const { cedula, nombre, apellido, ciudad, email, direccion, telefono, fecha_nacimiento, passwordCliente } = req.body;
  db.query('SELECT id FROM clientes WHERE cedula = ? OR email = ?', [cedula, email], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length > 0) {
      return res.status(400).json({ error: 'Ya existe un cliente con esa cédula o correo.' });
    }
    db.query('INSERT INTO clientes (cedula, nombre, apellido, ciudad, email, direccion, telefono, fecha_nacimiento, passwordCliente) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [cedula, nombre, apellido, ciudad, email, direccion, telefono, fecha_nacimiento, passwordCliente],
      (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ id: result.insertId, cedula, nombre, apellido, ciudad, email });
      });
  });
};

exports.update = (req, res) => {
  const { cedula } = req.params;
  const { nombre, apellido, ciudad, email, direccion, telefono, fecha_nacimiento, passwordCliente } = req.body;
  db.query('UPDATE clientes SET nombre=?, apellido=?, ciudad=?, email=?, direccion=?, telefono=?, fecha_nacimiento=?, passwordCliente=? WHERE cedula=?',
    [nombre, apellido, ciudad, email, direccion, telefono, fecha_nacimiento, passwordCliente, cedula],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ cedula, nombre, apellido, ciudad, email });
    });
};

exports.delete = (req, res) => {
  const { cedula } = req.params;
  db.query('DELETE FROM clientes WHERE cedula=?', [cedula], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Cliente eliminado' });
  });
};
