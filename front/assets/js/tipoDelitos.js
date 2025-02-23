let tabla = document.querySelector('#miTabla');
let frmDelito = document.querySelector('#frmDelito');
let nombre = document.querySelector('#nombre');
let grado_id = document.querySelector('#grado_id');
let elegirGrado = document.querySelector('.grado');
const frmCrearDelito = new bootstrap.Modal(document.getElementById('frmCrearDelito'));
let btnNuevo = document.querySelector('#btnNuevo');
let api = 'http://localhost:4100/api/delitos';
let APIgrado = "http://localhost:4100/api/grados/";
function grados() {
    fetch(APIgrado + "listarTodos")
    .then ((res) => res.json())
    .then ((res) => {
        console.log(res);
        res.grados.map((grados)=>{
            let options =
            `<option value ="${grados.id}">${grados.grado}</option>` + "</br>";
            elegirGrado.innerHTML += options;
        });
    });
}
let accionForm = "";
btnNuevo.addEventListener('click', () => {
    accionForm = "agregar";
    frmCrearDelito.show();
});
const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e);
        }
    });
};
function listarDelitos(){
    fetch(api + "listarTodos")
    .then((res) => res.json())
    .then((res) => {
        res.delitos.forEach((delitos)=>{
            let fila =
            `<tr>
            <td>${delitos.id}</td>
            <td>${delitos.nombre}</td>
            <td><a type= "button" class="btnEditar btn btn-sucess" onclick="obtenerId(${delitos.id},'editar')"><i class="bi bi-pencil-square"></i></a></td>
            <td><a type= "button" class="btnBorrar btn btn-danger" onclick="obtenerId(${delitos.id},'borrar')"><i class="bi bi-trash"></i></a></td>
            </tr>`+"</br>";
            tabla.innerHTML += fila;
        })
    })
}
frmDelito.addEventListener('submit', (e) => {
    e.preventDefault();
    if(accionForm == "agregar") {
        fetch(api + "crearDelito",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: nombre.value,
                grado_id: grado_id.value
            })
        })
        .then((res) => res.json())
        .then((res) => {
            location.reload();
        });
    } else if(accionForm == "editar") {
        fetch(api + "editarPorId/" + idFila + "",{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: nombre.value,
                grado_id: grado_id.value
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
        fetch(api + "listarPorId/"+ id + "", {})
        .then((res) => res.json())
        .then((res)=>{
            res.delitos.map((delitos)=>{
                nombre.value = delitos.nombre;
            });
        });
        frmCrearDelito.show();
    }else if(traerAccion === "borrar"){
        idFila = id;
        let respuesta = windows.confirm(`¿Estás seguro de borrar el registro con el id: ${idFila}?`);
        if(respuesta){
            fetch(api + "borrarPorId/" + id + "", {
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
listarDelitos();
grados();