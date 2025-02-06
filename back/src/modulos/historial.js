const express = require("express");
const bd = require("./bd.js");
const historial = express();
historial.get("/api/historial/listarPorId/:id", (req, res) => {
  let id = req.params.id;
  let consulta = `  
  SELECT registrodelito.idRegistroDelito AS id,ciudadanos.nombre, ciudadanos.apellido, ciudadanos.apodo, registrodelito.descripcion, tipodelito.delito, gradodelito.grado FROM historial
  INNER JOIN ciudadanos ON ciudadanos.idCiudadanos = historial.ciudadanos_idCiudadanos
  INNER JOIN registrodelito ON registrodelito.idRegistroDelito = historial.registroDelito_idRegistroDelito
  INNER JOIN tipodelito ON tipodelito.idTipoDelito = registrodelito.tipodelito_idTipoDelito
  INNER JOIN gradodelito ON gradodelito.idGradoDelito = tipodelito.gradodelito_idGradoDelito
  WHERE ciudadanos.idCiudadanos = ? ;`;
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