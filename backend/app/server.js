const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: ["http://127.0.0.1:5500", "http://localhost:3000"],
  credentials: true
};
app.use(cors(corsOptions));

// Servir archivos estáticos del frontend
const path = require('path');
app.use(express.static(path.join(__dirname, '../../frontend')));

// Redirigir todas las rutas que no sean API al index.html del frontend
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/index.html'));
});

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// Rutas principales
app.use("/api/usuarios", require("./routes/usuario.routes"));
app.use("/api/clientes", require("./routes/cliente.routes"));
app.use("/api/productos", require("./routes/producto.routes"));
app.use("/api/pedidos", require("./routes/pedido.routes"));

// Si tienes tutorial.routes.js y lo necesitas, puedes dejarlo así:
// require("./app/routes/tutorial.routes.js")(app);
// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` El servidor esta corriendo en el puerto ${PORT}.`);
});
