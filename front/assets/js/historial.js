let tablaHistorial = odcument.querySelector('#miTabla');
let idCiudadano = document.querySelector('idCiudadano');
let api = "http://localhost:4100/api/historial/";
idCiudadano.addEventListener('keyup', () => {
    let id = document.querySelector('idCiudadano').value;
    let api = "http://localhost:4100/api/historial/";
    function mostrarHistorial() {
        fetch (api + "listarPorId/" + id + "")
        .then((res) => res.json())
        .then((res)=> {
            console.log(res);
            res.historiales.forEach((historial) => {
                let fila =
                `<tr>
                <td>${historial.idHistorial}</td>
                <td>${historial.nombre}${historial.apellido}</td>
                <td>${historial.apodo}</td>
                <td>${historial.delito}</td>
                <td>${historial.grado}</td>
                <td style="text-align: justify;">${historial.descripcion}</td>
                </tr>`+ "</br>";
                tablaHistorial.innerHTML += fila;
            });
        });
    }
    mostrarHistorial();
});