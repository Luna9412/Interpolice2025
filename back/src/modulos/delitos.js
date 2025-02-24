const express = require('express');
const bd = require('./bd.js');
const delitos = express();
delitos.get("/api/delitos/listarTodos", (req, res) => {
    let consulta = "SELECT grados.grado, delitos.id, delitos.nombre FROM delitos INNER JOIN grados ON grados.id = delitos.grados_id";
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
  delitos.get("/api/delitos/listarPorId/:id", (req, res) => {
    let id = req.params.id;
    let consulta = "SELECT * FROM delitos WHERE id = ?";
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
  delitos.post("/api/delitos/crearDelito", (req, res) => {
    let formDatosDelitos = {
      nombre: req.body.nombre,
      grados_id: req.body.grados_id
    };
    let consulta = "INSERT INTO delitos SET ? ";
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
  delitos.delete("/api/delitos/borrarPorId/:id", (req, res) => {
    let id = req.params.id;
    let consulta = "DELETE FROM delitos WHERE id = ? ";
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
  delitos.put("/api/delitos/editarPorId/:id", (req, res) => {
    let id = req.params.id;
    let formDatosDelitos = {
      nombre: req.body.nombre,
      grados_id: req.body.grados_id
    };
    let consulta = "UPDATE delitos SET ? WHERE id = ?";
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