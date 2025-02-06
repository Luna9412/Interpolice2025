const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 4100;
app.use(cors());
app.use(express.json());
app.use("/",require("./src/modulos/historial.js")); // Ruta de historial
app.use("/",require("./src/modulos/usuarios.js")); // Ruta de usuarios
app.use("/",require("./src/modulos/roles.js")); // Ruta de roles
app.use("/",require("./src/modulos/ciudadanos.js")); // Ruta de ciudadanos
app.use("/",require("./src/modulos/especies.js")); // Ruta de especies
app.use("/",require("./src/modulos/grados.js")); // Ruta de grados
app.use("/",require("./src/modulos/delitos.js")); // Ruta de delitos
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
