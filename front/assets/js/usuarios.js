const usuarios = require("../../../back/src/modulos/usuarios");

let tabla = document.querySelector("#miTabla");
let usuario = document.querySelector("#TxtUsuario");
let contrasena = document.querySelector("#TxtContrasena");
let frmUsuario = document.querySelector("#frmUsuario");
let rol = document.querySelector(".rol");
let elegirRol = document.querySelector("#rol");
let accionForm = "";
const frmCrearUsuario = new bootstrap.Modal(document.getElementById('frmCrearUsuario'));
let btnNuevo = document.querySelector("#btnNuevo");

let api = "http://localhost:4100/api/usuario";
let APIroles = "http://localhost:4100/api/roles";

function listaRoles(){
    fetch(APIroles+ "listarTodos")
    .then((res) => res.json())
    .then((res)=>{
        res.roles.map((rol)=>{
            let options = `<option value ="${rol.idRoles}">${rol.nombre}</option>`+"</br>";
            elegirRol.innerHTML += options;
         });
    });
}
btnNuevo.addEventListener("click",()=>{
    accionForm = "agregar";
    frmCrearUsuario.show();
});

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e);
        }
    });
};

function listarUsuarios(){
    fetch(api + "listarTodos")
    .then((res) => res.json())
    .then((res)=>{
        console.log(res);
        res.usuarios.forEach((usuario)=>{
            let fila =
            `<tr>
            <td>${usuario.idUsuario}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.rol}</td>
            <td><a type="button" class="btnEditar btn btn-success" onclick="obtenerId(${usuario.idUsuario},'editar')"><i class="bi bi-pencil-square"></i></a></td>
            <td><a type="button" class="btnBorrar btn btn-danger" onclick="obtenerId(${usuario.idUsuario},'borrar')"><i class="bi bi-trash"></i></a></td>
            </tr>`+ "</br>";
            tabla.innerHTML += fila;
        })
    })
}
frmUsuario.addEventListener("submit",(e)=>{
    e.preventDefault();
    if(accionForm === "agregar"){
        fetch(api + "crearUsuario",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: usuario.value,
                contrasena: contrasena.value,
                roles_idRoles: rol.value
            })
        })
            .then((res) => res.json())
            .then((res)=>{
                console.log(res);
            });
        usuario.value = "";
        contrasena.value = "";
        location.reload();
    } else if (accionForm == "editar"){
        fetch(api + "editarPorId/" + idFila + "", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: usuario.value,
                contrasena: contrasena.value,
                roles_idRoles: rol.value
            })
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            location.reload();
        });
    }
});
function obtenerId (id,traerAccion) {
    if(traerAccion === "editar"){
        idFila = id;
        accionForm = "editar";
        fetch(api + "listarPorId/" + id + "",{})
        .then((res) => res.json())
        .then((res)=>{
            res.usuarios.map(usuarios =>{
                usuario.value = usuarios.nombre;
                contrasena.value = usuarios.contrasena;
            });
        });
        frmCrearUsuario.show();
    } else if(traerAccion === "borrar"){
        idFila = id;
        let respuesta = window.confirm(`¿Seguro que desea borrar el registro ${idFila}?`);
        if(respuesta){
            fetch(api + "borrarPorId/" + id + "",{
                method: "DELETE"
            })
            .then((res) => res.json())
            .then((res)=>{
                console.log(res);
                location.reload();
            });
        }
    }
}

listarUsuarios();
listaRoles();