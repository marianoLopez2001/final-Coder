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