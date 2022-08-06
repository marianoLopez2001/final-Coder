import { mostrarCards } from "./app.js"
import { pushStorageACarrito } from "./localStorage.js"
import { validacionParaObtenerElTotalEnDom } from "./operacionTotal.js"

document.addEventListener("DOMContentLoaded", mostrarCards)
document.addEventListener("DOMContentLoaded", pushStorageACarrito)
document.addEventListener("DOMContentLoaded", validacionParaObtenerElTotalEnDom)
