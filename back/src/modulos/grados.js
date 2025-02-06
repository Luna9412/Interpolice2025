const express = require("express");
const bd = require("./bd.js");
const grados = express();
grados.get("/api/grado/listarTodos", (req, res) => {
  let consulta = "SELECT * FROM gradodelito";
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
grados.get("/api/grado/listarPorId/:id", (req, res) => {
  let id = req.params.id;
  let consulta = "SELECT * FROM gradodelito WHERE idGradoDelito  = ?";
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
grados.post("/api/grado/crearGrado", (req, res) => {
  let formDatosGrados = {
    grado: req.body.grado
  };
  let consulta = "INSERT INTO gradodelito SET ?";
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
grados.delete("/api/grado/borrarPorId/:id", (req, res) => {
  let id = req.params.id;
  let consulta = "DELETE FROM gradodelito WHERE idGradoDelito = ? ";
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
grados.put("/api/grado/editarPorId/:id", (req, res) => {
  let id = req.params.id;
  let formDatosGrados = {
    grado: req.body.grado
  };
  let consulta = "UPDATE gradodelito SET ? WHERE idGradoDelito = ?";
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
