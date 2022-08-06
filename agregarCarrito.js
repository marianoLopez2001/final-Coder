
//CARRITO DE COMPRAS

import { getDBData } from "./getdata.js";
import { operacionTotal } from "./operacionTotal.js";
import { actualizarCarritoHTML } from "./renderizarCarrito.js";

export const Carrito = [];

//FUNCION AGREGAR AL CARRITO SI LA CONDICION "STOCK" SE CUMPLE

export const agregarAlCarrito = async (id) => {

    const Catalogo = await getDBData()

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






