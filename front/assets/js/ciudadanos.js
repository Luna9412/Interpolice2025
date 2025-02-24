let tabla = document.querySelector("#miTabla");
let frmCiudadano = document.querySelector("#frmCiudadano");
let nombre = document.querySelector("#nombre");
let apellido = document.querySelector("#apellido");
let apodo = document.querySelector("#apodo");
let email = document.querySelector("#email");
let fechaNacimiento = document.querySelector("#fechaNacimiento");
let especies = document.querySelector(".especies"); //revisar
let especies_id = document.querySelector("#especies_id");
let idFila = 0;
let accionForm = "";

const frmCrearCiudadano = new bootstrap.Modal(document.getElementById("frmCrearCiudadano"));
let btnNuevo = document.querySelector("#btnNuevo");

let api = "http://localhost:4100/api/ciudadanos";
let ApiEspecies = "http://localhost:4100/api/especies";

function especies() {
    fetch(ApiEspecies + "listarTodos")
        .then(res => res.json())
        .then(res => {
            console.log(res);
            res.especies.map((especies) => {
                let options = `<option value="${especies.id}">${especies.nombre}</option>`+"</br>";
                elegirEspecie.innerHTML += options;
            })
        });
}

btnNuevo.addEventListener("click", () => {
    accionForm = "agregar";
    frmCrearCiudadano.show();
});
const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e);
        }
    });
};

function listarCiudadanos() {
    fetch(api + "listarTodos")
    .then(res => res.json())
    .then(res => {
        res.ciudadanos.forEach((ciudadanos) => {
            let fila =
            `<tr>
            <td>${ciudadanos.id}</td>
            <td>${ciudadanos.nombre}</td>
            <td>${ciudadanos.apellido}</td>
            <td>${ciudadanos.apodo}</td>
            <td>${ciudadanos.email}</td>
            <td>${ciudadanos.fechaNacimiento}</td>
            <td>${ciudadanos.especies_id}</td>
            <td><a type="button" class="btnEditar btn btn-sucess" onclick="obtenerId(${ciudadanos.id}, 'editar')"><i class="bi bi-pencil-square"></i></a></td>
            <td><a type="button" class="btnBorrar btn btn-danger" onclick="obtenerId(${ciudadanos.id}, 'borrar')"><i class="bi bi-trash"></i></a></td>
            </tr>`+"</br>";
            tabla.innerHTML += fila;
        });
    });
}
frmCiudadano.addEventListener("submit", (e) => {
    e.preventDefault();
    if(accionForm == "agregar") {
        fetch(api + "crearCiudadano",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: nombre.value,
                apellido: apellido.value,
                apodo: apodo.value,
                email: email.value,
                fechaNacimiento: fechaNacimiento.value,
                especie: especies_id.value
            })
        })
        .then(res => res.json())
        .then(res => {
            location.reload();
            console.log(res);
        });
    }else if (accionForm == "editar") {
        fetch(api + "editarPorId/" + idFila, + "", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: nombre.value,
                apellido: apellido.value,
                apodo: apodo.value,
                email: email.value,
                fechaNacimiento: fechaNacimiento.value,
                especie: especies_id.value
            })
        })
        .then(res => res.json())
        .then((res) => {
            console.log(res);
        });
    }
});
function obtenerId(id,traerAccion){
    if(traerAccion == "editar") {
        idFila = id;
        accionForm = "editar";
        fetch(api + "listarPorId/" + id + "",{})
        .then(res => res.json())
        .then(res => {
            res.ciudadanos.map((ciudadanos) => {
                nombre.value = ciudadanos.nombre;
                apellido.value = ciudadanos.apellido;
                apodo.value = ciudadanos.apodo;
                email.value = ciudadanos.email;
                fechaNacimiento.value = ciudadanos.fechaNacimiento;
                let fechaBD = new Date(ciudadanos.fechaNacimiento);
                const fechaFormato = fechaBD.toLocaleDateString("es-CO", {
                    timeZone: "UTC"
                });
                fechaNacimiento.value = fechaFormato;
                especies_id.value = ciudadanos.especies_id;
            });
    });
    frmCrearCiudadano.show();
}else if (traerAccion == "borrar") {
    idFila = id;
    let respuesta = window.confirm(`¿Está seguro de borrar el registro con el id: ${idFila}?`);
    if(respuesta) {
        fetch(api + "borrarPorId/" + id + "",{ // POSIBLEMENTE CAMBIAR LA BARIABLE ID POR IDFILA
            method: "DELETE"
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            location.reload();
        });
    }
}
}
listarCiudadanos();
especies();