//FUNCION PARA QUE AL INICIO DE LA PAGINA ME RENDERIZE EL CONTENIDO DEL STORAGE AL CARRITO

import { Carrito } from "./agregarCarrito.js";

let objetoStorageGet = JSON.parse(localStorage.getItem("Carrito"))

export function pushStorageACarrito() {
    objetoStorageGet && objetoStorageGet.forEach(i => {
        Carrito.push(i)
    });
}