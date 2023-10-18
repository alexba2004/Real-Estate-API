// Importación de express.
import express, { request, response } from "express";

// Instancia de express.
const router = express.Router();

// Rutas a través de GET
/* router.get("/", (request, response) => {
    response.send("Hola Web a través de GET");
}); */

// Renderizado del Template Engine Login.pug
router.get("/", (request, response) => response.render("layout/index.pug", { page: "Home" }));

router.get("/quienSos", (request, response) => {
    response.send("Soy tu primera App Web en arquitectrua SOA");
});
router.get("/quienUsas", (request, response) => {
    response.send("Estoy construida en el lenguaje de programación JavaScript, y utilizo el microservidor de Express.js");
});
router.get("/misDatos", (request, response) => {
    response.json({ nombre: "Jose Alejandro Briones Arroyo", fechaNacimiento: "22-10-2004", matricula: "220103" });
});

// Rutas a través de POST.
router.post("/", (request, response) => {
    response.send("You're consulting data trough POST");
});

// Rutas a través de PUT.
router.put("/", (request, response) => {
    response.send("You're trying to update some properties of data trough PUT");
});

// Routes a través de PATCH.
router.patch("/", (request, response) => {
    response.send("You're trying to update all data object trough PATCH");
});

// Routes a través de DELETE.
router.delete("/", (request, response) => {
    response.send("Are you sure that you want to DELETE data?");
});

// Exportación.
export default router;
