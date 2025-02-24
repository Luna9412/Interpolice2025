const express = require("express");
const bd = require("./bd.js");
const historial = express();
historial.get("/api/historial/listarPorId/:id", (req, res) => {
  let id = req.params.id;
  let consulta = `  
  SELECT registrodelito.id AS id,ciudadanos.nombre AS nombre, ciudadanos.apellido AS apellido, ciudadanos.apodo AS apodo, registrodelito.descripcion AS descripcion, delitos.nombre AS delito, grados.grado AS grado FROM historial
  INNER JOIN ciudadanos ON ciudadanos.id = historial.ciudadanos_id
  INNER JOIN registrodelito ON registrodelito.id = historial.registroDelito_id
  INNER JOIN delitos ON delitos.id = registrodelito.delitos_id
  INNER JOIN grados ON grados.id = delitos.grados_id
  WHERE ciudadanos.id = ? ;`;
  bd.query(consulta, [id], (error, historial) => {
    if (error) {
      res.send({
        status: "Error",
        message: "¡Error en la consulta!",
        error: error
      });
    } else {
      res.send({
        status: "Ok",
        message: "¡Consulta Exitosa!",
        historial: historial
      });
    }
  });
});
module.exports = historial;