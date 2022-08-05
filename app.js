const DB = "../data.json";

const getDBData = async () => {
    const res = await fetch(DB)
    const data = await res.json()

    return data
}

//CARRITO DE COMPRAS

const Carrito = [];

//CREADOR DE CARDS IF STOCK=TRUE

let cardContainer

const precioDom = document.querySelector("#dom-precio")

const mostrarCards = async () => {
    
    const catalogo = await getDBData()

    for (const iterador of catalogo) {
        cardContainer = document.querySelector("#card-container");
        const cardHTML = `
            <div class="card-container">
                <img src=${iterador.img} alt="">
                  <p>${iterador.nombre}</p>
                  <p>${iterador.descripcion}</p>
                  <p>Precio: ${iterador.precio}</p>
                  <button class="btn btn-primary" onClick="agregarAlCarrito(${iterador.id})">Agregar al carrito</button>
            </div>
            `
        iterador.stock && (cardContainer.innerHTML += cardHTML)
    }
}
document.addEventListener("DOMContentLoaded", mostrarCards)
//FUNCION AGREGAR AL CARRITO SI LA CONDICION "STOCK" SE CUMPLE

function agregarAlCarrito(id) {

    let buscarProductoEnCatalogo = Catalogo.find(buscarId => buscarId.id === id)

    let buscarProductoEnCarrito = Carrito.find(buscarId => buscarId.id === id)

    buscarProductoEnCarrito ? (
        buscarProductoEnCarrito.cantidad++,
        actualizarCarritoHTML()
    ) : (
        buscarProductoEnCatalogo.cantidad = 1,
        Carrito.push(buscarProductoEnCatalogo), actualizarCarritoHTML()
    );

    Toastify({
        text: "Producto agregado",
        duration: 1500,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        style: {
            background: "linear-gradient(to right, #3eec00, #86ff5b)",
        }
    }).showToast();

    operacionTotal()

    localStorage.setItem("Carrito", JSON.stringify(Carrito))
}

let objetoStorageGet = JSON.parse(localStorage.getItem("Carrito"))

//FUNCION PARA QUE AL INICIO DE LA PAGINA ME RENDERIZE EL CONTENIDO DEL STORAGE AL CARRITO

document.addEventListener("DOMContentLoaded", pushStorageACarrito())

function pushStorageACarrito() {
    objetoStorageGet && objetoStorageGet.forEach(i => {
        Carrito.push(i)
    });
}

//FUNCION PARA RENDERIZAR MIS PRODUCTOS DEL CARRITO AL DOM

let carritoHTMLContainer

//RENDERIZA EL CARRITO EN HTML
function actualizarCarritoHTML() {

    let carritoHTML = ""
    carritoHTMLContainer = document.querySelector(".carrito-dropdown-container");

    Carrito.forEach((iterador, id) => {
        carritoHTML += `
        <div class="card-container">
            <img src=${iterador.img} alt="">
            <div class="inner-card-container">
              <p>${iterador.nombre}</p>
              <p>${iterador.descripcion}</p>
            </div>
            <p>${iterador.precio}</p>
            <p>${iterador.cantidad}</p>
            <button class="botonEliminarCarrito" onClick="eliminarDelCarrito(${id})">Eliminar</button>
        </div>
        `;
    })

    carritoHTMLContainer.innerHTML = carritoHTML
}

document.addEventListener("DOMContentLoaded", actualizarCarritoHTML)


//FUNCION ELIMINAR DEL CARRITO

let botonEliminarCarrito = document.querySelector(".botonEliminarCarrito")

function eliminarDelCarrito(id) {

    Carrito[id].cantidad--;

    Carrito[id].cantidad === 0 ? (
        operacionTotal(),
        Carrito.splice(id, 1)
    ) : (
        operacionTotal()
    );

    Toastify({
        text: "Producto eliminado",
        duration: 1500,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        style: {
            background: "linear-gradient(to right, #ff0000, #ff5b5b)",
        }
    }).showToast();

    localStorage.setItem("Carrito", JSON.stringify(Carrito))

    actualizarCarritoHTML()

};

//FUNCION QUE CALCULA EL TOTAL DE LA COMPRA Y LO MUESTRA EN EL DOM MEDIANTE UNA VALIDACION
function operacionTotal() {

    let costoTotal = 0

    Carrito.forEach((p) => {
        costoTotal += p.precio * p.cantidad;
    })

    JSON.stringify(localStorage.setItem("Total", costoTotal))
    let costoTotalStorage = JSON.parse(localStorage.getItem("Total"))

    precioDom.innerHTML = `Costo total: ${costoTotalStorage}`
}

document.addEventListener("DOMContentLoaded", validacionParaObtenerElTotalEnDom)

function validacionParaObtenerElTotalEnDom() {
    JSON.parse(localStorage.getItem("Total")) && (precioDom.innerHTML = `Costo total: ${JSON.parse(localStorage.getItem("Total"))}`)
}

//OPCION DE FILTRADO POR CATEGORIA MARCA

function filtrarPorCategoria() {
    let llamadoSelectFilter = document.querySelector("#btn-filter").value

    const Filtrado = Catalogo.filter(marca => marca.categoria == llamadoSelectFilter)

    cardContainer.innerHTML = ""

    for (const iterador of Filtrado) {
        iterador.stock === true && (
            cardContainer.innerHTML += `
                <div class="card-container">
                    <img src=${iterador.img} alt="">
                      <p>${iterador.nombre}</p>
                      <p>${iterador.descripcion}</p>
                      <p>Precio: ${iterador.precio}</p>
                      <button class="btn btn-primary" onClick="agregarAlCarrito(${iterador.id})">Agregar al carrito</button>
                </div>
                `
        )
    }

    if (llamadoSelectFilter === "No filtrar") {
        for (const iterador of Catalogo) {
            iterador.stock === true && (
                cardContainer.innerHTML += `
                <div class="card-container">
                    <img src=${iterador.img} alt="">
                      <p>${iterador.nombre}</p>
                      <p>${iterador.descripcion}</p>
                      <p>Precio: ${iterador.precio}</p>
                      <button class="btn btn-primary" onClick="agregarAlCarrito(${iterador.id})">Agregar al carrito</button>
                </div>
                `)

        }
    }
}

