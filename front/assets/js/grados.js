let tabla = document.querySelector("#miTabla");
let frmGrado = document.querySelector("#frmGrado");
let nivelGrado = document.querySelector("#nivelGrado");
let idFila = 0;
const frmCrearGrado = new bootstrap.Modal(document.getElementById("frmCrearGrado"));
let btnNuevo = document.querySelector("#btnNuevo");
let api = "http://localhost:4100/api/grado/";

let accionForm = "";
btnNuevo.addEventListener("click", () => {
    accionForm = "crear";
    frmCrearGrado.show();
});

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e);
        }
    });
};
function listarGrados() {
    fetch(api + "listarTodos")
        .then((response) => response.json())
        .then((res) => {
           res.grados.forEach((grados) => {
            let fila =
           `<tr>
           <td>${grados.idGradoDelito}</td>
           <td>${grados.grado}</td>
           <td><a type="button" class="btnEditar btn btn-sucess" onclick="obtenerId(${grados.idGradoDelito},'editar')"<i class="bi bi-pencil-square"></i></a></td>
           <td><a type="button" class="btnBorrar btn btn-danger" onclick="obtenerId(${grados.idGradoDelito},'borrar')"<i class="bi bi-trash"></i></a></td>
           </tr>`+"</br>";
           tabla.innerHTML += fila;
            });
        });
}
frmGrado.addEventListener("submit", (e) => {
    e.preventDefault();
    if(accionForm == "crear") {
        fetch(api + "crearGrado",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                grado: nivelGrado.value
            })
        })
        .then((res)=> res.json())
        .then((res)=>{
            console.log(res);
            location.reload();
        });
    } else if(accionForm == "editar") {
        fetch(api + "editarPorId/" + idFila + "",{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                grado: nivelGrado.value
            })
        })
        .then((res)=> res.json())
        .then((res)=>{
            console.log(res);
            location.reload();
        });
    }
});
function obtenerId (id,traerAccion) {
    if(traerAccion == "editar") {
        idFila = id;
        accionForm = "editar";
        fetch(api + "listarPorId/" + id +"",{})
        .then((res) => res.json())
        .then((res) => {
            res.grados.map((grados) => {
                nivelGrado.value = grados.grado;
            });
        });
        frmCrearGrado.show();
    }else if(traerAccion == "borrar") {
        idFila = id;
        let respuesta = window.confirm(`¿Está seguro de borrar el registro con el id: ${idFila}?`);
        if(respuesta) {
            fetch(api + "borrarPorId/" + idFila + "", {
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
listarGrados();