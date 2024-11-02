let paginaActual = 1;
let resultadosPagina = 25;
let photos = [];

document.addEventListener("DOMContentLoaded", () => {
    mostrarResultados();
});

function mostrarResultados() {
    const fecha = document.getElementById("fecha").value;
    const URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${fecha}&api_key=qbmGyPiuRA1ZeOXxQCt8aIjYXmWXEKg4qQKx6Gxz&page=${paginaActual}`;

    fetch(URL)
        .then(response => response.json())
        .then(resultado => {
            photos = resultado.photos; 
            agregarTabla();
            if (photos.length > 0) {
                mostrarDetalles(photos[0]); 
            }
        });
}

function agregarTabla() {
    const tabla = document.getElementById("tabla");
    photos.slice(0, resultadosPagina).forEach((dato, indice) => {
        let fila = document.createElement("tr");
        
        let celdaID = document.createElement("td");
        celdaID.textContent = dato.id;
        fila.appendChild(celdaID);

        let celdaRoverNombre = document.createElement("td");
        celdaRoverNombre.textContent = dato.rover.name;
        fila.appendChild(celdaRoverNombre);

        let celdaCamera = document.createElement("td");
        celdaCamera.textContent = dato.camera.name;
        fila.appendChild(celdaCamera);

        let celdaDetalles = document.createElement("td");
        let botonDetalles = document.createElement("button");
        botonDetalles.textContent = "Detalles";
        botonDetalles.className = "detalles";
        
        botonDetalles.onclick = function() {
            mostrarDetalles(dato);
        };
        
        celdaDetalles.appendChild(botonDetalles);
        fila.appendChild(celdaDetalles);
        tabla.appendChild(fila);
    });
}

function mostrarDetalles(dato) {
    const imagen = document.getElementById("imagen");
    imagen.src = dato.img_src;  
    document.getElementById("idx").textContent = dato.id;
    document.getElementById("ms").textContent = dato.rover.name;
    document.getElementById("date").textContent = dato.earth_date;
}


document.getElementById("previous").addEventListener("click", () => {
    if (paginaActual > 1) {
        paginaActual--;
        mostrarResultados();
    }
});

document.getElementById("next").addEventListener("click", () => {
    paginaActual++;
    mostrarResultados();
});

function mostrarResultados() {
    const fecha = document.getElementById("fecha").value;
    const URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${fecha}&api_key=qbmGyPiuRA1ZeOXxQCt8aIjYXmWXEKg4qQKx6Gxz&page=${paginaActual}`;

    fetch(URL)
        .then(response => response.json())
        .then(resultado => {
            photos = resultado.photos; 
            limpiarTabla();  
            agregarTabla();
            if (photos.length > 0) {
                mostrarDetalles(photos[0]);
            }
            document.getElementById("previous").disabled = paginaActual === 1;
            document.getElementById("next").disabled = photos.length < resultadosPagina;
        });
}

function limpiarTabla() {
    const tabla = document.getElementById("tabla");
    while (tabla.rows.length > 1) {
        tabla.deleteRow(1);
    }
}

