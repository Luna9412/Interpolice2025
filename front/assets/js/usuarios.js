const usuarios = require("../../../back/src/modulos/usuarios");

let tabla = document.querySelector("#miTabla");
let nombre = document.querySelector("#nombre");
let contrasena = document.querySelector("#contrasena");
let frmUsuario = document.querySelector("#frmUsuario");
let rol = document.querySelector(".rol");
let roles_id = document.querySelector("#roles_id");
let accionForm = "";
const frmCrearUsuario = new bootstrap.Modal(document.getElementById('frmCrearUsuario'));
let btnNuevo = document.querySelector("#btnNuevo");
let api = "http://localhost:4100/api/usuarios";
let APIroles = "http://localhost:4100/api/roles";
function listaRoles(){
    fetch(APIroles+ "listarTodos")
    .then((res) => res.json())
    .then((res)=>{
        res.roles.map((roles)=>{
            let options = `<option value ="${roles.id}">${roles.nombre}</option>`+"</br>";
            roles_id.innerHTML += options;
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
        res.usuarios.forEach((usuarios)=>{
            let fila =
            `<tr>
            <td>${usuarios.id}</td>
            <td>${usuarios.nombre}</td>
            <td>${usuarios.roles_id}</td>
            <td><a type="button" class="btnEditar btn btn-success" onclick="obtenerId(${usuarios.id},'editar')"><i class="bi bi-pencil-square"></i></a></td>
            <td><a type="button" class="btnBorrar btn btn-danger" onclick="obtenerId(${usuarios.id},'borrar')"><i class="bi bi-trash"></i></a></td>
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
                nombre: nombre.value,
                contrasena: contrasena.value,
                roles_id: roles_id.value
            })
        })
            .then((res) => res.json())
            .then((res)=>{
                console.log(res);
            });
        nombre.value = "";
        contrasena.value = "";
        location.reload();
    } else if (accionForm == "editar"){
        fetch(api + "editarPorId/" + idFila + "", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: nombre.value,
                contrasena: contrasena.value,
                roles_id: roles_id.value
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
                nombre.value = usuarios.nombre;
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