const express = require('express');
const bcrypt = require('bcryptjs');
const bd = require('./bd.js');
const usuarios = express();
usuarios.get("/api/usuarios/listarTodos", (req, res) => {
    let consulta ="SELECT roles.nombre AS rol, usuarios.id, usuarios.nombre, usuarios.contrasena FROM usuarios INNER JOIN roles ON usuarios.roles_id = roles.id";
    bd.query(consulta, (error, usuarios) => {
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
          usuarios: usuarios
        });
      }
    });
  });
  usuarios.get("/api/usuarios/listarPorId/:id", (req, res) => {
    let id = req.params.id;
    let consulta = "SELECT * FROM usuarios WHERE id  = ?";
    bd.query(consulta, [id], (error, usuarios) => {
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
          usuarios: usuarios
        });
      }
    });
  });
  usuarios.post("/api/usuarios/crearUsuario", (req, res) => {
    let formDatosUsuarios = {
      nombre: req.body.nombre,
      contrasena: bcrypt.hashSync(req.body.contrasena, 10),
      roles_id: req.body.roles_id
    };
    let consulta = "INSERT INTO usuarios SET ? ";
    bd.query(consulta, [formDatosUsuarios], (error, usuarios) => {
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
          usuarios: usuarios
        });
      }
    });
  });
  usuarios.delete("/api/usuarios/borrarPorId/:id", (req, res) => {
    let id = req.params.id;
    let consulta = "DELETE FROM usuarios WHERE id = ? ";
    bd.query(consulta, [id], (error, usuarios) => {
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
          usuarios: usuarios
        });
      }
    });
  });
  usuarios.put("/api/usuarios/editarPorId/:id", (req, res) => {
    let id = req.params.id;
    let formDatosUsuarios = {
      nombre: req.body.nombre,
      roles_id: req.body.roles_id,
      contrasena: bcrypt.hashSync(req.body.contrasena, 10)
    };
    let consulta = "UPDATE usuarios SET ? WHERE id  = ?";
    bd.query(consulta, [formDatosUsuarios, id], (error, usuarios) => {
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
          usuarios: usuarios
        });
      }
    });
  });
  module.exports = usuarios;
  