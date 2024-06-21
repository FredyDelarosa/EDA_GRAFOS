import LinkedList from "./LinkendList.mjs";

export default class Graph {
    #adjacencyMatrix = [];
    #vertexMap = new Map();

    constructor() {}

    addLocations(...locations) {
        for (let location of locations) {
            this.#adjacencyMatrix.push(new LinkedList());
            this.#vertexMap.set(location, this.#adjacencyMatrix.length - 1);
        }
    }

    addLocation(location) {
        if (!this.#vertexMap.has(location)) {
            this.#adjacencyMatrix.push(new LinkedList());
            this.#vertexMap.set(location, this.#adjacencyMatrix.length - 1);
        }
    }

    addConnection(start, end, weight = 1) {
        if (this.#vertexMap.has(start) && this.#vertexMap.has(end)) {
            this.#adjacencyMatrix[this.#vertexMap.get(start)].push(end, weight);
            return true;
        }
        return false;
    }

    depthFirstSearch(callback) {
        let visited = [];
        const entries = [...structuredClone(this.#vertexMap)];
        for (let i = 0; i < this.#adjacencyMatrix.length; i++)
            visited[i] = false;
    
        const dfs = (vertex) => {
            visited[this.#vertexMap.get(vertex)] = true;
            callback(vertex);
            let neighbors = [...this.#adjacencyMatrix[this.#vertexMap.get(vertex)].toArray()];
            for (let neighbor of neighbors) {
                if (!visited[this.#vertexMap.get(neighbor.name)]) {
                    dfs(neighbor.name);
                }
            }
        };
    
        let [key] = entries[0];
        dfs(key);
    }

    // Implementa el algoritmo de Dijkstra para encontrar rutas más cortas desde 'start'
dijkstra(start) {
    const distances = {};  // Distancias mínimas desde 'start'
    const previous = {};   // Vértice anterior en la ruta más corta
    const vertices = Array.from(this.#vertexMap.keys());  // Todos los vértices
    const V = this.#vertexMap.size;  // Número de vértices
    const L = new Array(V).fill(false);  // Vértices procesados
    const D = new Array(V).fill(Infinity);  // Distancias desde 'start'

    // Inicialización de distancias
    vertices.forEach(vertex => {
        distances[vertex] = Infinity;  // Distancia inicial infinita
        previous[vertex] = null;  // Sin vértice anterior
    });
    distances[start] = 0;  // Distancia de 'start' a sí mismo es 0

    // Inicializar el array D
    D[this.#vertexMap.get(start)] = 0;

    // Encontrar rutas más cortas
    for (let count = 0; count < V - 1; count++) {
        let u = this.minDistance(D, L);  // Vértice con distancia mínima
        L[u] = true;  // Marca el vértice como procesado

        // Actualizar distancias de vértices adyacentes no procesados
        for (let v = 0; v < V; v++) {
            if (!L[v] && this.#adjacencyMatrix[u].toArray()[v] && D[u] !== Infinity && D[u] + this.#adjacencyMatrix[u].toArray()[v].distance < D[v]) {
                D[v] = D[u] + this.#adjacencyMatrix[u].toArray()[v].distance;  // Actualiza distancia
                distances[vertices[v]] = D[v];  // Actualiza distancia en 'distances'
                previous[vertices[v]] = vertices[u];  // Actualiza vértice anterior
            }
        }
    }

    return { distances, previous };  // Retorna distancias y rutas
}

// Encuentra el vértice con la distancia mínima que no ha sido procesado
minDistance(D, L) {
    let min = Infinity;  // Valor mínimo inicial
    let minIndex = -1;   // Índice del mínimo

    // Buscar el vértice con distancia mínima
    for (let v = 0; v < D.length; v++) {
        if (!L[v] && D[v] <= min) {
            min = D[v];  // Actualiza el mínimo
            minIndex = v;  // Actualiza el índice del mínimo
        }
    }

    return minIndex;  // Retorna el índice del vértice con la distancia mínima
}


    getAllShortestPaths(start) {
        const { distances, previous } = this.dijkstra(start);
        const paths = {};

        for (let end of this.#vertexMap.keys()) {
            const path = [];
            let current = end;

            while (current !== null) {
                path.unshift(current);
                current = previous[current];
            }

            if (path[0] === start) {
                paths[end] = path;
            } else {
                paths[end] = [];
            }
        }

        return { distances, paths };
    }
}


