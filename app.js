//CREADOR DE CARDS IF STOCK=TRUE

import { agregarAlCarrito } from "./agregarCarrito.js";
import { getDBData } from "./getdata.js";

let cardContainer //se puede borrar?

export const mostrarCards = async () => {

    const catalogo = await getDBData()

    catalogo.forEach(iterador => {
        const cardContainer = document.querySelector("#card-container");
        const cardHTML = `
            <div class="card-container">
                <img src=${iterador.img} alt="">
                  <p>${iterador.nombre}</p>
                  <p>${iterador.descripcion}</p>
                  <p>Precio: ${iterador.precio}</p>
                  <button class="btn btn-primary" id=agregarAlCarrito${iterador.id} >Agregar al carrito</button>
            </div>
            `
        iterador.stock && (cardContainer.innerHTML += cardHTML)

        let botonAgregarCarrito = document.getElementById(`agregarAlCarrito${iterador.id}`)

        console.log(botonAgregarCarrito);

        botonAgregarCarrito.addEventListener("click", agregarAlCarrito(iterador.id))
    });
}


