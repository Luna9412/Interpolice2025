const express = require("express");
const bd = require("./bd.js");
const especies = express();
especies.get("/api/especies/listarTodos", (req, res) => {
  let consulta = "SELECT * FROM especies";
  bd.query(consulta, (error, especies) => {
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
        especies: especies
      });
    }
  });
});
especies.get("/api/especies/listarPorId/:id", (req, res) => {
  let id = req.params.id;
  let consulta = "SELECT * FROM especies WHERE id = ?";
  bd.query(consulta, [id], (error, especies) => {
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
        especies: especies
      });
    }
  });
});
especies.post("/api/especies/crearEspecie", (req, res) => {
  let formDatosDeEspecies = {
    nombre: req.body.nombre
  };
  let consulta = "INSERT INTO especies SET ? ";
  bd.query(consulta, [formDatosDeEspecies], (error, especies) => {
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
        especies: especies
      });
    }
  });
});
especies.delete("/api/especies/borrarPorId/:id", (req, res) => {
  let id = req.params.id;
  let consulta = "DELETE FROM especies WHERE id = ? ";
  bd.query(consulta, [id], (error, especies) => {
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
        especies: especies
      });
    }
  });
});
especies.put("/api/especies/editarPorId/:id", (req, res) => {
  let id = req.params.id;
  let formDatosDeEspecies = {
    nombre: req.body.nombre
  };
  let consulta = "UPDATE especies SET ? WHERE id  = ?";
  bd.query(consulta, [formDatosDeEspecies, id], (error, especies) => {
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
        especies: especies
      });
    }
  });
});
module.exports = especies;
