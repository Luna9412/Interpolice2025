const express = require("express");
const bd = require("./bd.js");
const grados = express();
grados.get("/api/grados/listarTodos", (req, res) => {
  let consulta = "SELECT * FROM grados";
  bd.query(consulta, (error, grados) => {
    if (error) {
      res.send({
        status: "Error",
        message: "¡Error en la Consulta!",
        error: error
      });
    } else {
      res.send({
        status: "Ok",
        message: "¡Consulta Exitosa!",
        grados: grados
      });
    }
  });
});
grados.get("/api/grados/listarPorId/:id", (req, res) => {
  let id = req.params.id;
  let consulta = "SELECT * FROM grados WHERE id  = ?";
  bd.query(consulta, [id], (error, grados) => {
    if (error) {
      res.send({
        status: "Error",
        message: "¡Error en la Consulta!",
        error: error
      });
    } else {
      res.send({
        status: "Ok",
        message: "¡Consulta Exitosa!",
        grados: grados
      });
    }
  });
});
grados.post("/api/grados/crearGrado", (req, res) => {
  let formDatosGrados = {
    grado: req.body.grado
  };
  let consulta = "INSERT INTO grados SET ?";
  bd.query(consulta, [formDatosGrados], (error, grados) => {
    if (error) {
      res.send({
        status: "Error",
        message: "¡Error en la Consulta!",
        error: error
      });
    } else {
      res.send({
        status: "Ok",
        message: "¡Consulta Exitosa!",
        grados: grados
      });
    }
  });
});
grados.delete("/api/grados/borrarPorId/:id", (req, res) => {
  let id = req.params.id;
  let consulta = "DELETE FROM grados WHERE id = ? ";
  bd.query(consulta, [id], (error, grados) => {
    if (error) {
      res.send({
        Status: "Error",
        Mensaje: "¡Error en la Consulta!",
        error: error
      });
    } else {
      res.send({
        Status: "Ok",
        Mensaje: "Registro borrado!",
        grados: grados
      });
    }
  });
});
grados.put("/api/grados/editarPorId/:id", (req, res) => {
  let id = req.params.id;
  let formDatosGrados = {
    grado: req.body.grado
  };
  let consulta = "UPDATE grados SET ? WHERE id = ?";
  bd.query(consulta, [formDatosGrados, id], (error, grados) => {
    if (error) {
      res.send({
        status: "Error",
        message: "¡Error en la Consulta!",
        error: error
      });
    } else {
      res.send({
        status: "Ok",
        message: "¡Consulta Exitosa!",
        grados: grados
      });
    }
  });
});
module.exports = grados;