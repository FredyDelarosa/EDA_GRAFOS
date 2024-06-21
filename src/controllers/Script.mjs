import Graph from "../models/Graph.mjs";

document.addEventListener('DOMContentLoaded', function() {
    const graph = new Graph();

    const addLocationForm = document.getElementById('addLocationForm');
    addLocationForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita el envío del formulario

        const locationNameInput = document.getElementById('locationName');
        const locationName = locationNameInput.value.trim();

        if (locationName !== '') {
            graph.addLocation(locationName);
            console.log(`Ubicación agregada: ${locationName}`);
            console.log('Estado del grafo:', JSON.stringify(graph));
            locationNameInput.value = ''; 
        } else {
            console.log('Ingrese un nombre válido para la ubicación.');
        }
    });

    const addConnectionForm = document.getElementById('addConnectionForm');
    addConnectionForm.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const startLocationInput = document.getElementById('startLocation');
        const endLocationInput = document.getElementById('endLocation');
        const weightInput = document.getElementById('weight');

        const startLocation = startLocationInput.value.trim();
        const endLocation = endLocationInput.value.trim();
        const weight = parseInt(weightInput.value);

        if (startLocation !== '' && endLocation !== '' && !isNaN(weight)) {
            const added = graph.addConnection(startLocation, endLocation, weight);
            if (added) {
                console.log(`Conexión agregada de ${startLocation} a ${endLocation} con peso ${weight}`);
                console.log('Estado del grafo:', JSON.stringify(graph));
                startLocationInput.value = '';
                endLocationInput.value = '';
                weightInput.value = '';
            } else {
                console.log('No se pudo agregar la conexión. Verifique las ubicaciones.');
            }
        } else {
            console.log('Ingrese valores válidos para las ubicaciones y el peso.');
        }
    });

    const depthFirstSearchBtn = document.getElementById('dfsBtn');
    depthFirstSearchBtn.addEventListener('click', function() {
        const resultContainer = document.getElementById('resultContainer');
        resultContainer.innerHTML = ''; 

        graph.depthFirstSearch((location) => {
            console.log(`Visitando ubicación: ${location}`);
            resultContainer.innerHTML += `${location} `;
        });
    });

    const totalWeightBtn = document.getElementById('totalWeightBtn');
    totalWeightBtn.addEventListener('click', function() {
        const totalWeight = graph.getTotalWeight();
        console.log(`La suma de los pesos de todas las conexiones es: ${totalWeight}`);
    });

    const shortestPathForm = document.getElementById('shortestPathForm');
    shortestPathForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita el envío del formulario

        const startLocationInput = document.getElementById('shortestPathStart');
        const startLocation = startLocationInput.value.trim();

        if (startLocation !== '') {
            const { distances, paths } = graph.getAllShortestPaths(startLocation);
            const resultContainer = document.getElementById('resultContainer');
            resultContainer.innerHTML = '';
            console.log(`Rutas más cortas desde ${startLocation}:`);
            for (let end in paths) {
                if (paths[end].length > 0) {
                    const pathString = paths[end].join(' -> ');
                    const distance = distances[end];
                    console.log(`A ${end}: ${pathString} (Distancia: ${distance})`);
                    resultContainer.innerHTML += `De ${startLocation} a ${end}: ${pathString} (Distancia: ${distance})<br>`;
                } else {
                    console.log(`No hay ruta de ${startLocation} a ${end}`);
                    resultContainer.innerHTML += `No hay ruta de ${startLocation} a ${end}<br>`;
                }
            }
        } else {
            console.log('Ingrese un valor válido para la ubicación de inicio.');
        }
    });
});
