const express = require("express");
const bd = require("./bd.js");
const roles = express();
roles.get("/api/roles/listarTodos", (req, res) => {
  let consulta = "SELECT * FROM roles";
  bd.query(consulta, (error, roles) => {
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
        roles: roles
      });
    }
  });
});
roles.get("/api/roles/listarPorId/:id", (req, res) => {
  let id = req.params.id;
  let consulta = "SELECT * FROM roles WHERE id  = ?";
  bd.query(consulta, [id], (error, roles) => {
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
        roles: roles
      });
    }
  });
});
roles.post("/api/roles/crearRol", (req, res) => {
  let formDatosDeRoles = {
    nombre: req.body.nombre
  };
  let consulta = "INSERT INTO roles SET ?";
  bd.query(consulta, [formDatosDeRoles], (error, roles) => {
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
        roles: roles
      });
    }
  });
});
roles.delete("/api/roles/borrarPorId/:id", (req, res) => {
  let id = req.params.id;
  let consulta = "DELETE FROM roles WHERE id = ?";
  bd.query(consulta, [id], (error, respuesta) => {
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
        respuesta: respuesta
      });
    }
  });
});
roles.put("/api/roles/editarPorId/:id", (req, res) => {
  let id = req.params.id;
  let formDatosDeRoles = {
    nombre: req.body.nombre
  };
  let consulta = "UPDATE roles SET ? WHERE id = ?";
  bd.query(consulta, [formDatosDeRoles, id], (error, respuesta) => {
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
        respuesta: respuesta
      });
    }
  });
});
module.exports = roles;