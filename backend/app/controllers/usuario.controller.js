const db = require('../models/db');

// Listar todos los usuarios
exports.getAll = (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Crear usuario
exports.create = (req, res) => {
  const { nombre, apellido, email, password } = req.body;
  db.query('SELECT id FROM usuarios WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length > 0) {
      return res.status(400).json({ error: 'Ya existe un usuario con ese correo.' });
    }
    db.query('INSERT INTO usuarios (nombre, apellido, email, password) VALUES (?, ?, ?, ?)',
      [nombre, apellido, email, password],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.sqlMessage || err.message || String(err) });
        res.json({ id: result.insertId, nombre, apellido, email });
      });
  });
};

// Actualizar usuario
exports.update = (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, email, password } = req.body;
  db.query('UPDATE usuarios SET nombre=?, apellido=?, email=?, password=? WHERE id=?',
    [nombre, apellido, email, password, id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id, nombre, apellido, email });
    });
};

// Obtener usuario por id
exports.getById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(results[0]);
  });
};

// Eliminar usuario
exports.delete = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM usuarios WHERE id=?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Usuario eliminado' });
  });
};
