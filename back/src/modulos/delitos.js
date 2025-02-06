const express = require('express');
const bd = require('./bd.js');
const delitos = express();
delitos.get("/api/delito/listarTodosDelitos", (req, res) => {
    let consulta = "SELECT gradodelito.grado, tipodelito.idTipoDelito, tipodelito.delito FROM tipodelito INNER JOIN gradodelito ON gradodelito.idGradoDelito = tipodelito.gradoDelito_idGradoDelito";
    bd.query(consulta, (error, delitos) => {
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
          delitos: delitos
        });
      }
    });
  });
  delitos.get("/api/delito/listarPorId/:id", (req, res) => {
    let id = req.params.id;
    let consulta = "SELECT * FROM tipodelito WHERE idTipoDelito = ?";
    bd.query(consulta,[id], (error, delitos) => {
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
          delitos: delitos
        });
      }
    });
  });
  delitos.post("/api/delito/crearDelito", (req, res) => {
    let formDatosDelitos = {
      delito: req.body.delito,
      gradoDelito_idGradoDelito: req.body.gradoDelito_idGradoDelito
    };
    let consulta = "INSERT INTO tipodelito SET ? ";
    bd.query(consulta, [formDatosDelitos], (error, delitos) => {
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
          delitos: delitos
        });
      }
    });
  });
  delitos.delete("/api/delito/borrarPorId/:id", (req, res) => {
    let id = req.params.id;
    let consulta = "DELETE FROM tipodelito WHERE idTipoDelito = ? ";
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
          Mensaje: "¡Registro borrado!",
          respuesta: respuesta
        });
      }
    });
  });
  delitos.put("/api/delito/editarPorId/:id", (req, res) => {
    let id = req.params.id;
    let formDatosDelitos = {
      delito: req.body.delito,
      gradoDelito_idGradoDelito: req.body.gradoDelito_idGradoDelito
    };
    let consulta = "UPDATE tipodelito SET ? WHERE idTipoDelito = ?";
    bd.query(consulta, [formDatosDelitos, id], (error, respuesta) => {
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
  module.exports = delitos;