import LinkedList from "./LinkedList.mjs";
import PriorityQueue from "./PriorityQueue.mjs";

export default class Graph {
    
    #matrizAdyacencia = [];
    #map = new Map();
    constructor() {}

    /*
    addVertices(...vertices) {
        for (let vertex of vertices) {
            this.addVertex(vertex);
        }
    }
    */

    addVertex(vertex) {
        if (!this.#map.has(vertex)) {
            this.#matrizAdyacencia.push(new LinkedList()); // Agrega una nueva lista enlazada en la matriz de adyacencia
            this.#map.set(vertex, this.#matrizAdyacencia.length - 1); // Asocia el vértice con su índice en la matriz de adyacencia
            return true;
        }
        return false;
    }

    // Método para agregar una conexión
    addEdge(node1, node2, weight = 1) {
        if (this.#map.has(node1) && this.#map.has(node2)) { // Verifica si ambos nodos existen
            this.#matrizAdyacencia[this.#map.get(node1)].push(node2, weight); // Agrega la conexión en la lista enlazada
            return true;
        }
        return false;
    }

    // Implementación del algoritmo de Dijkstra
    dijkstra(startVertex, endVertex) {
        const distances = {}; // Almacena las distancias mínimas
        const visited = new Set(); // Almacena los vértices visitados
        const pq = new PriorityQueue(); // Cola de prioridad para seleccionar el siguiente vértice

        // Inicializa las distancias con infinito
        for (let vertex of this.getVertices()) {
            distances[vertex] = Infinity;
        }
        distances[startVertex] = 0; // La distancia al vértice inicial es 0
        pq.enqueue(startVertex, 0); // Agrega el vértice inicial a la cola de prioridad

        // Mientras haya vértices por procesar
        while (!pq.isEmpty()) {
            const { vertex: currentVertex } = pq.dequeue(); // Saca el vértice con la menor distancia
            if (visited.has(currentVertex)) continue; // Si ya fue visitado lo omite
            visited.add(currentVertex); // Marca el vértice como visitado

            const neighbors = this.getNeighbors(currentVertex); // Obtiene los vecinos del vértice actual
            let current = neighbors.head; // Comienza desde la cabeza de la lista de vecinos

            // Recorre todos los vecinos del vértice actual
            while (current) {
                const neighbor = current.value.node; // Obtiene el vecino
                const weight = current.value.weight; // Obtiene el peso de la arista
                const totalDistance = distances[currentVertex] + weight; // Calcula la nueva distancia

                // Si la nueva distancia es menor, actualiza la distancia y agrega el vecino a la cola
                if (totalDistance < distances[neighbor]) {
                    distances[neighbor] = totalDistance;
                    pq.enqueue(neighbor, totalDistance);
                }
                current = current.next; // Pasa al siguiente vecino
            }
        }

        return distances[endVertex];
    }

    // Implementación del recorrido en profundidad (DFS)
    dfs(startVertex, callback) {
        if (!this.#map.has(startVertex)) {
            return;
        }

        const visited = {}; // Almacena los vértices visitados
        const stack = []; // Pila para almacenar los vértices por visitar
        stack.push(startVertex); // Agrega el vértice inicial a la pila

        // Mientras haya vértices en la pila
        while (stack.length > 0) {
            const currentVertex = stack.pop(); // Saca el último vértice agregado
            if (!visited[currentVertex]) { // Si no fue visitado
                callback(currentVertex); // Llama al callback con el vértice actual
                visited[currentVertex] = true; // Marca el vértice como visitado
                const neighborsLinkedList = this.#matrizAdyacencia[this.#map.get(currentVertex)]; // Obtiene los vecinos
                let current = neighborsLinkedList.head; // Comienza desde la cabeza de la lista de vecinos
                while (current) {
                    const neighborVertex = current.value.node; // Obtiene el vecino
                    if (!visited[neighborVertex]) {
                        stack.push(neighborVertex); // Agrega el vecino a la pila si no fue visitado
                    }
                    current = current.next; // Pasa al siguiente vecino
                }
            }
        }
    }

    // Implementación del recorrido en anchura
    bfs(startVertex, callback) {
        if (!this.#map.has(startVertex)) {
            return;
        }

        const visited = {}; // Almacena los vértices visitados
        const queue = []; // Cola para almacenar los vértices por visitar
        queue.push(startVertex); // Agrega el vértice inicial a la cola

        // Mientras haya vértices en la cola
        while (queue.length > 0) {
            const currentVertex = queue.shift(); // Saca el primer vértice agregado
            if (!visited[currentVertex]) { // Si no fue visitado
                callback(currentVertex); // Llama al callback con el vértice actual
                visited[currentVertex] = true; // Marca el vértice como visitado
                const neighborsLinkedList = this.#matrizAdyacencia[this.#map.get(currentVertex)]; // Obtiene los vecinos
                let current = neighborsLinkedList.head; // Comienza desde la cabeza de la lista de vecinos
                while (current !== null) {
                    const neighborVertex = current.value.node; // Obtiene el vecino
                    if (!visited[neighborVertex]) {
                        queue.push(neighborVertex); // Agrega el vecino a la cola si no fue visitado
                    }
                    current = current.next; // Pasa al siguiente vecino
                }
            }
        }
    }

    getVertices() {
        return this.#map.keys();
    }

    // Obtiene los vecinos de un vértice dado
    getNeighbors(vertex) {
        const index = this.#map.get(vertex); // Obtiene el índice del vértice
        if (index !== undefined) {
            return this.#matrizAdyacencia[index]; // Devuelve la lista de vecinos
        }
        return null;
    }

    numVertices() {
        return this.#map.size;
    }
}
