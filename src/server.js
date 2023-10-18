// ECMS6.

// Importando la libreria de Express para activar la comunicaciónvía protocolo HTTP.
import express from "express";

// Importando el archivo donde se encuentran las rutas
import generalRoutes from "./routes/generalRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import db from "./config/db.js";
import User from "./models/User.js";

// Instanciamos el modulo express de la libreria para definir el servidor que atenderá las peticiones.
const app = express();
const port = 3000; // 64400 puertos mtb 1024 - S0
app.use(express.urlencoded({ extended: false }));

// Agregar y configurar el TemplateEngine.
app.set("view engine", "pug");
app.set("views", "./src/views");
console.log("==============[DATA BASE]=============");
try {
    db.authenticate();
    console.log("La conexion a base de datos ha sido exitosa");
    db.sync();
    console.log("Se han sincronizado exitosamente las tablas en la Base de Datos");
} catch (error) {
    console.log("Hubo un error al conectarme a la Base de Datos");
    console.log(error);
}
// Definimos la carpeta para los recursos públicos.
app.use(express.static("./src/public"));

app.listen(port, (request, response) => {
    console.log(`===============[SERVER]===============\nEl servidor web has sido iniciado y esta esperando solicitudes (requests)\nActualmente se encuentra escuchando a través del puerto: ${port}\n--------------------------------------`);
});

// Ultilizando las rutas importadas.
app.use("/", generalRoutes);
app.use("/login", userRoutes);

/* Routing - Contratando las peticiones que se reciben por medio de un endpoint (URL)
app.get("/", (request, response) => response.send("Hola Web"));
app.get("/quienSos", (request, response) => response.send("Soy tu primera App Web en arquitectrua SOA"));
app.get("/quienUsas", (request, response) => response.send("Estoy construida en el lenguaje de programación JavaScript, y utilizo el microservidor de Express.js"));
app.get("/misDatos", (request, response) => response.json({ nombre: "Jose Alejandro Briones Arroyo", fechaNacimiento: "22-10-2004", matricula: "220103" })); */
