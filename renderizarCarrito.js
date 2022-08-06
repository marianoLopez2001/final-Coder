//FUNCION PARA RENDERIZAR MIS PRODUCTOS DEL CARRITO AL DOM

import { getDBData } from "./getdata.js";

let carritoHTMLContainer

//RENDERIZA EL CARRITO EN HTML
export const actualizarCarritoHTML = async () => {

    const Carrito = await getDBData()

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
            <button class="botonEliminarCarrito" id="eliminarDelCarrito${id})">Eliminar</button>
        </div>
        `;

        // const botonEliminarCarrito = document.getElementById(`eliminarDelCarrito(${id}`);

        // console.log(botonEliminarCarrito);
    })

    carritoHTMLContainer.innerHTML = carritoHTML
}