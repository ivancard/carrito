const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {
    // Al hacer click en los botones "Añadir curso" de los cursos, este se añade a el carrito.
    listaCursos.addEventListener("click", agregarCurso);
    //Elimina cursos del carrito.
    carrito.addEventListener("click", eliminarCurso);
    //Vaciar el carrito.
    vaciarCarritoBtn.addEventListener("click", () => {
        articulosCarrito = [];
        limpiarHTML();
    });
}

//Funciones

function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains("agregar-carrito")) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

//Eliminar curso del carrito.
function eliminarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains("borrar-curso")) {
        const cursoId = e.target.getAttribute("data-id");
        articulosCarrito = articulosCarrito.filter(
            (curso) => curso.id !== cursoId
        );
        mostrarCarrito(); //Actualiza el HTML sin el curso borrado.
    }
}

//Le el contenido del HTML del curso al que le dimos click.
function leerDatosCurso(curso) {
    //Se crea un objeto para declarar propiedades del objeto curso.
    const infoCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1,
    };

    const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
    if (existe) {
        //Actualiza la cantidad
        const cursos = articulosCarrito.map((curso) => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        });
        articulosCarrito = [...cursos];
    } else {
        //se agrega el curso al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    mostrarCarrito();
}

//Mostrar carrito en HTML

function mostrarCarrito() {
    //Limpiar el HTML
    limpiarHTML();
    //Recorrer el arreglo de carrito y crea el HTML
    articulosCarrito.forEach((curso) => {
        const { imagen, titulo, precio, id, cantidad } = curso;
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
            <img src="${imagen}" width="100">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `;
        //Agregar el contenido al HTML
        contenedorCarrito.appendChild(row);
    });
}

//Elimina los cursos del tbody
function limpiarHTML() {
    //contenedorCarrito.innerHTML = "";

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}
