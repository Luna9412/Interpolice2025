let tabla = document.querySelector("#tabla)");
let frmRoles = document.querySelector("#frmRoles");
let nombreRol = document.querySelector("#nombreRol");
const frmCrearRol = new bootstrap.Modal(document.getElementById("frmCrearRol"));
let btnNuevo = document.querySelector("#btnNuevo");
let api = "http://localhost:4100/api/roles/";
let accionForm = "";
btnNuevo.addEventListener("click", () => {
    accionForm = "crear";
    frmCrearRol.show();
});

const on = (element, event, selector, handler) => {
    element.addEventListener(event, (e)=>{
        if(e.target.closest(selector)){
            handler(e);
        }
    });
};

function listarRoles(){
    fetch(api + "listarTodos")
    .then((res) => res.json())
    .then((res) => {
        console.log(res);
        res.role.forEach((roles)=>{
            let fila =
            `<tr>
            <td>${roles.idRoles}</td>
            <td>${roles.nombre}</td>
            <td><a type="button" class="btnEditar btn btn-sucess" onclick="obtenerId(${roles.idRoles}, 'editar')"><i class="bi bi-pencil-square"></i></a></td>
            <td><a type="button" class="btnEliminar btn btn-danger" onclick="obtenerId(${roles.idRoles}, 'borrar')"><i class="bi bi-trash"></i></a></td>
            </tr>` + "</br>";
            tabla.innerHTML += fila;
        });
    });
}
frmRoles.addEventListener("submit", (e) => {
    e.preventDefault();
    if(accionForm == "crear"){
        fetch(api + "crearRol",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nombre: nombreRol.value
            })
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            location.reload();
        });
    } else if(accionForm == "editar"){
        fetch(api + "editarPorId/" + idFila + "", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: nombreRol.value
            })
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            location.reload();
        });
    }
});
function obtenerId(id, traerAccion){
    if(traerAccion === "editar"){
        idFila = id;
        accionForm = "editar";
        fetch(api + "listarPorId/" + id + "", {})
        .then((res) => res.json())
        .then((res) => {
            res.roles.map((roles) => {
                nombreRol.value = roles.nombre;
            });
        });
        frmCrearRol.show();
    } else if (traerAccion === "borrar"){
        idFila = id;
        let respuesta = window.confirm(`¿Está seguro de eliminar el registro con el id: ${idFila}?`);
        if(respuesta){
            fetch(api + "borrarPorId/" + id + "",{
                method: "DELETE"
            })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                location.reload();
            });
        }
    }
}
listarRoles();