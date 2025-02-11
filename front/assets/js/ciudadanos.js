let tabla = document.querySelector("#miTabla");
let frmCiudadano = document.querySelector("#frmCiudadano");
let nombreCiudadano = document.querySelector("#TxtNombre");
let apellidoCiudadano = document.querySelector("#TxtApellido");
let apodoCiudadano = document.querySelector("#TxtApodo");
let correoCiudadano = document.querySelector("#TxtCorreo");
let fechaNacimiento = document.querySelector("#TxtFechaNacimiento");
let especieCiudadano = document.querySelector(".especie");
let elegirEspecie = document.querySelector("#elegirEspecie");
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
            res.especie.map((especie) => {
                let options = `<option value="${especie.idEspecie}">${especie.nombre}</option>`+"</br>";
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
        res.ciudadano.forEach((ciudadano) => {
            let fila =
            `<tr>
            <td>${ciudadano.idCiudadano}</td>
            <td>${ciudadano.nombre}</td>
            <td>${ciudadano.apellido}</td>
            <td>${ciudadano.apodo}</td>
            <td>${ciudadano.correo}</td>
            <td>${ciudadano.fechaNacimiento}</td>
            <td>${ciudadano.especie}</td>
            <td><a type="button" class="btnEditar btn btn-sucess" onclick="obtenerId(${ciudadano.idCiudadano}, 'editar')"><i class="bi bi-pencil-square"></i></a></td>
            <td><a type="button" class="btnBorrar btn btn-danger" onclick="obtenerId(${ciudadano.idCiudadano}, 'borrar')"><i class="bi bi-trash"></i></a></td>
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
                nombre: nombreCiudadano.value,
                apellido: apellidoCiudadano.value,
                apodo: apodoCiudadano.value,
                correo: correoCiudadano.value,
                fechaNacimiento: fechaNacimiento.value,
                especie: especieCiudadano.value
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
                nombre: nombreCiudadano.value,
                apellido: apellidoCiudadano.value,
                apodo: apodoCiudadano.value,
                correo: correoCiudadano.value,
                fechaNacimiento: fechaNacimiento.value,
                especie: especieCiudadano.value
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
            res.ciudadano.map((ciudadano) => {
                nombreCiudadano.value = ciudadano.nombre;
                apellidoCiudadano.value = ciudadano.apellido;
                apodoCiudadano.value = ciudadano.apodo;
                correoCiudadano.value = ciudadano.correo;
                fechaNacimiento.value = ciudadano.fechaNacimiento;
                let fechaBD = new Date(ciudadano.fechaNacimiento);
                const fechaFormato = fechaBD.toLocaleDateString("es-CO", {
                    timeZone: "UTC"
                });
                fechaNacimiento.value = fechaFormato;
                especieCiudadano.value = ciudadano.especie;
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