import Graph from "../models/Graph.mjs";

const graph = new Graph();

const btnAgregarDestino = document.getElementById("AddRed");
const btnAgregarConexion = document.getElementById("AddRed2");
const btnRecorridoProfundidad = document.getElementById("profundidad");
const btnRecorridoAnchura = document.getElementById("anchura");
const btnRedMasRapida = document.getElementById("redMasRapida");
const tbodyProfundidad = document.getElementById("tbodyProfundidad");
const tbodyAnchura = document.getElementById("tbodyAnchura");
const tbodyDijkstra = document.getElementById("tbodyDijkstra");

function mostrarAlerta(icon, title, message) {
    Swal.fire({
        icon: icon,
        title: title,
        text: message,
        confirmButtonColor: '#007bff'
    });
}

btnAgregarDestino.addEventListener("click", () => {
    const red = document.getElementById("redes").value.trim();
    
    if (red !== "") {
        if (graph.addVertex(red)) {
            mostrarAlerta('success', 'Registro Exitoso', `Se registró la red ${red}`);
        } else {
            mostrarAlerta('error', 'Error', 'No se pudo registrar la red');
        }
    } else {
        mostrarAlerta('error', 'Error', 'Debe ingresar el nombre de la red');
    }
});

btnAgregarConexion.addEventListener("click", () => {
    const redInicial = document.getElementById("inicial").value.trim();
    const destino = document.getElementById("destino").value.trim();
    const peso = parseInt(document.getElementById("peso").value);

    if (redInicial !== "" && destino !== "") {
        if (graph.addEdge(redInicial, destino, peso)) {
            mostrarAlerta('success', 'Conexión Agregada', 'La conexión se agregó correctamente');
        } else {
            mostrarAlerta('error', 'Error', 'No se pudo agregar la conexión');
        }
    } else {
        mostrarAlerta('error', 'Error', 'Debe ingresar ambas redes para la conexión');
    }
});

btnRecorridoProfundidad.addEventListener("click", () => {
    tbodyProfundidad.innerHTML = '';
    
    const vertices = [...graph.getVertices()][0];
    
    graph.dfs(vertices, (vertex) => {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.textContent = vertex;
        row.appendChild(cell);
        tbodyProfundidad.appendChild(row);
    });
    
    mostrarAlerta('info', 'Ejecutando Recorrido De Profundidad', 'Recorrido en profundidad completado');
});

btnRecorridoAnchura.addEventListener("click", () => {
    tbodyAnchura.innerHTML = '';
    
    const vertices = [...graph.getVertices()][0];
    
    graph.bfs(vertices, (vertex) => {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.textContent = vertex;
        row.appendChild(cell);
        tbodyAnchura.appendChild(row);
    });
    
    mostrarAlerta('info', 'Ejecutando Recorrido De Anchura', 'Recorrido en anchura completado');
});

btnRedMasRapida.addEventListener("click", () => {
    tbodyDijkstra.innerHTML = '';

    const inicioDijkstra = document.getElementById("inicioDijkstra").value.trim();
    const destinoDijkstra = document.getElementById("destinoDijkstra").value.trim();

    if (inicioDijkstra !== "" && destinoDijkstra !== "") {
        const distance = graph.dijkstra(inicioDijkstra, destinoDijkstra);
        if (distance !== Infinity) {
            const row = document.createElement('tr');
            const cellDistance = document.createElement('td');
            cellDistance.textContent = distance;
            row.appendChild(cellDistance);
            tbodyDijkstra.appendChild(row);

            mostrarAlerta('success', 'Ruta Más Rápida', `La distancia más rápida entre ${inicioDijkstra} y ${destinoDijkstra} es ${distance}`);
        } else {
            mostrarAlerta('error', 'Error', 'No se encontró una ruta entre las redes especificadas');
        }
    } else {
        mostrarAlerta('error', 'Error', 'Debe ingresar ambas redes para encontrar la ruta más rápida');
    }
});
