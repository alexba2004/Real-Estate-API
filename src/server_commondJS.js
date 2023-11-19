// CommonJS.

// Importando la libreria de Express para activar la comunicación vía protocolo HTTP.
const express = require("express");

// Instanciamos el modulo express de la libreria para definir el servidor que atenderá las peticiones.
const app = express();

const port = 3000; // 64400 puertos mtb 1024 - S0

app.listen(port, (request, response) => {
    console.log(`El servidor web has sido iniciado y esta esperando solicitudes (requests) \n Actualmente se encuentra escuchando a través del puerto: ${port}`);
});

// Routing - Contratando las peticiones que se reciben por medio de un endpoint (URL).
app.get("/", (request, response) => response.send("Hola Web"));
app.get("/quienSos", (request, response) => response.send("Soy tu primera App Web en arquitectrua SOA"));
app.get("/quienUsas", (request, response) => response.send("Estoy construida en el lenguaje de programación JavaScript, y utilizo el microservidor de Express.js"));
app.get("/misDatos", (request, response) => response.json({ nombre: "Jose Alejandro Briones Arroyo", fechaNacimiento: "22-10-2004", matricula: "220103" }));
