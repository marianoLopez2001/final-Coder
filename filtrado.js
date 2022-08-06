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

