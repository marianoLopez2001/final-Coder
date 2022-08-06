//FUNCION QUE CALCULA EL TOTAL DE LA COMPRA Y LO MUESTRA EN EL DOM MEDIANTE UNA VALIDACION

import { Carrito } from "./agregarCarrito.js";

const precioDom = document.querySelector("#dom-precio")

export function operacionTotal() {

    let costoTotal = 0

    Carrito.forEach((p) => {
        costoTotal += p.precio * p.cantidad;
    })

    JSON.stringify(localStorage.setItem("Total", costoTotal))
    let costoTotalStorage = JSON.parse(localStorage.getItem("Total"))

    precioDom.innerHTML = `Costo total: ${costoTotalStorage}`
}

export function validacionParaObtenerElTotalEnDom() {
    JSON.parse(localStorage.getItem("Total")) && (precioDom.innerHTML = `Costo total: ${JSON.parse(localStorage.getItem("Total"))}`)
}