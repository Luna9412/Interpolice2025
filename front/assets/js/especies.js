// interacciones con la tabla aprendiz
let tablaEspecie = document.querySelector("#miTabla");
let frmEspecie = document.querySelector("#frmEspecie");
let nombre = document.querySelector("#nombre");
let btnNuevo = document.querySelector("#btnNuevo");
let accionForm = "";
let btnPagina1 = document.querySelector("#btnPagina1");
let btnPagina2 = document.querySelector("#btnPagina2");
let btnPagina3 = document.querySelector("#btnPagina3");
let btnAnterior = document.querySelector("#btnAnterior");
let btnSiguiente = document.querySelector("#btnSiguiente");
let li1 = document.querySelector("#li1");
let li2 = document.querySelector("#li2");
let li3 = document.querySelector("#li3");
let limite = 15;
let pagina = 1;
const frmCrearEspecie = new bootstrap.Modal(document.getElementById("frmCrearEspecie"));
let api = "http://localhost:4100/api/especies/";
btnNuevo.addEventListener("click", () => {
  accionForm = "agregar";
  frmCrearEspecie.show();
});
btnSiguiente.addEventListener("click", () => {
  if (pagina < 67) {
    pagina = pagina + 1;
  } else {
    pagina = 1;
  }
  tablaEspecie.innerHTML = "";
  listarEspecie();
});
btnAnterior.addEventListener("click", () => {
  if (pagina > 1) {
    pagina = pagina - 1;
  } else {
    pagina = 67;
  }
  tablaEspecie.innerHTML = "";
  listarEspecie();
});

btnPagina1.addEventListener("click", () => {
  pagina = parseInt(btnPagina1.innerText);
  tablaEspecie.innerHTML = "";
  listarEspecie();
});
btnPagina2.addEventListener("click", () => {
  pagina = parseInt(btnPagina2.innerText);
  tablaEspecie.innerHTML = "";
  listarEspecie();
});
btnPagina3.addEventListener("click", () => {
  pagina = parseInt(btnPagina3.innerText);
  tablaEspecie.innerHTML = "";
  listarEspecie();
});
if (pagina == 1) {
  btnPagina1.innerText = 1;
  btnPagina2.innerText = 2;
  btnPagina3.innerText = 3;
} else if (pagina == 67) {
  btnPagina1.innerText = 65;
  btnPagina2.innerText = 66;
  btnPagina3.innerText = 67;
} else {
  btnPagina1.innerText = pagina - 1;
  btnPagina2.innerText = pagina;
  btnPagina3.innerText = pagina + 1;
}
li1.setAttribute("class", "page-item");
li2.setAttribute("class", "page-item");
li3.setAttribute("class", "page-item");
if (btnPagina1.innerText == pagina) {
  li1.setAttribute("class", "page-item active");
} else if (btnPagina2.innerText == pagina) {
  li2.setAttribute("class", "page-item active");
} else if (btnPagina3.innerText == pagina) {
  li3.setAttribute("class", "page-item active");
}
const on = (element, event, selector, handler) => {
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};
function listarEspecie() {
  fetch(api + "listarTodasEspecies" + "?limite=" + limite + "&pagina=" + pagina)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      res.especies.forEach((especies) => {
        let fila =
         `<tr>
          <td>${especies.id}</td>
          <td>${especies.nombre}</td>   
          <td><a type="button" class="btnEditar btn btn-success" onclick="obtenerID(${especies.id},'editar') " ><i class="bi bi-pencil-square"></i></a></td>
          <td><a type="button" class="btnBorrar btn btn-danger" onclick="obtenerID(${especies.id},'eliminar') "  ><i class="bi bi-trash"></i></a></td>
          </tr> ` + "</br>";
        tablaEspecie.innerHTML += fila;
      });
    });
}
frmEspecie.addEventListener("submit", (e) => {
  e.preventDefault(); // previene el evento por defecto de los formularios
  if (accionForm == "agregar") {
    fetch(api + "crearEspecie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombre: nombre.value
      })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        location.reload();
      });
  } else if (accionForm == "editar") {
    fetch(api + "editarEspeciePorId/" + idFila + "", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombre: nombre.value
      })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        location.reload();
      });
  }
});
function obtenerID(id, traerAccion) {
  if (traerAccion === "editar") {
    idFila = id;
    accionForm = "editar";
    fetch(api + "listarPorId/" + id + "", {})
      .then((res) => res.json())
      .then((res) => {
        res.especies.map((especies) => {
          nombre.value = especies.nombre;
        });
      });
    frmCrearEspecie.show();
  } else if (traerAccion === "eliminar") {
    idFila = id;
    let respuesta = window.confirm(`Seguro que desea borrar el registro con el id: ${idFila}`);
    if (respuesta) {
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
listarEspecie();