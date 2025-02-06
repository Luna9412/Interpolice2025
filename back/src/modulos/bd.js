const mysql = require('mysql2');
// CADENA DE CONEXION
const cnx = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
cnx.connect((err) => {
    if (err) {
        console.log(`Error en la conexion \n ${err}`);
        return;
    }
    console.log('Conectado a la base de datos');
});
module.exports = cnx;