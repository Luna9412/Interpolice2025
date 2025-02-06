const express = require('express');
const bd = require('./bd');
const ciudadanos = express();
ciudadanos.get("/api/ciudadanos/listarTodos", (req, res) => {
    let consulta = "SELECT ciudadanos.idCiudadano, ciudadanos.nombre, ciudadanos.apellido, ciudadanos.apodo, ciudadanos.email, ciudadanos.fechaNacimiento, especies.nombre AS especie FROM ciudadanos INNER JOIN especies ON especies.idEspecie = ciudadanos.idEspecie";
    bd.query(consulta, (error, ciudadanos) => {
        if (error) {
            res.send({
                status: "error",
                message: "¡Error en la Consulta!",
                error: error
            });
    }else {
        res.send({
            status: "Ok",
            message: "¡Consulta Exitosa!",
            ciudadanos: ciudadanos
        });
    }
});
});
ciudadanos.get("/api/ciudadanos/listarPorId/:id", (req, res) => {
    let id = req.params.id;
    let consulta = "SELECT * FROM ciudadanos WHERE idCiudadano = ?";
    bd.query(consulta,[id], (error, ciudadanos) => {
        if (error) {
            res.send({
                status: "error",
                message: "¡Error en la Consulta!",
                error: error
            });
    }else {
        res.send({
            status: "Ok",
            message: "¡Consulta Exitosa!",
            ciudadanos: ciudadanos
        });
    }
});
});
ciudadanos.post("/api/ciudadanos/CrearCiudadano", (req, res) => {
    let formDatosCiudadano = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        apodo: req.body.apodo,
        email: req.body.email,
        fechaNacimiento: req.body.fechaNacimiento,
        idEspecie: req.body.idEspecie
    }
    let consulta = "INSERT INTO ciudadanos SET ?";
    bd.query(consulta,[formDatosCiudadano], (error, ciudadanos) => {
        if (error) {
            res.send({
                status: "error",
                message: "¡Error en la Consulta!",
                error: error
            });
    }else {
        res.send({
            status: "Ok",
            message: "¡Consulta Exitosa!",
            ciudadanos: ciudadanos
        });
    }
});
});
ciudadanos.delete("/api/ciudadanos/borrarPorId/:id", (req, res) => {
    let id = req.params.id;
    let consulta = "DELETE FROM ciudadanos WHERE idCiudadano = ? ";
    bd.query(consulta, [id], (error, ciudadanos) => {
      if (error) {
        res.send({
          Status: "Error",
          Mensaje: "¡Error en la Consulta!",
          error: error
        });
      } else {
        res.send({
          Status: "Ok",
          Mensaje: "¡Consulta Exitosa!",
          ciudadanos: ciudadanos
        });
      }
    });
  });
  ciudadanos.put("/api/ciudadanos/editarPorId/:id", (req, res) => {
    let id = req.params.id;
    let formDatosCiudadano = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        apodo: req.body.apodo,
        email: req.body.email,
        fechaNacimiento: req.body.fechaNacimiento,
        idEspecie: req.body.idEspecie
    }
    let consulta = "UPDATE ciudadanos SET ? WHERE idCiudadano = ?";
    bd.query(consulta, [formDatosCiudadano,id], (error, ciudadanos) => {
      if (error) {
        res.send({
          Status: "Error",
          Mensaje: "¡Error en la Consulta!",
          error: error
        });
      } else {
        res.send({
          Status: "Ok",
          Mensaje: "¡Consulta Exitosa!",
          ciudadanos: ciudadanos
        });
      }
    });
  });
  module.exports = ciudadanos;
  