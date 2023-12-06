import express, { urlencoded } from "express";
import userRoutes from "./routes/userRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import db from "./config/db.js";
import { User, Property } from "./models/relationships.js";
import helmet from "helmet";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config({
    path: "src/.env",
});

// Intanciar modulo
const app = express();
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cookie parser para leer, escribir y guardar cookies del navegador
app.use(
    cookieParser({
        cookie: true,
    })
);

// Motor de plantillas
app.set("view engine", "pug");
app.set("views", "./src/views");
app.use(express.static("./src/public"));

// Porteccion con Helmet
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "https://unpkg.com", "https://cdnjs.cloudflare.com", "'unsafe-eval'", "'unsafe-inline'"],
            styleSrc: ["'self'", "https://unpkg.com", "https://cloudflare.com", "https://cdnjs.cloudflare.com"],
            imgSrc: ["'self'", "data:", "https://unpkg.com", "https://cloudflare.com", "https://cdnjs.cloudflare.com", "https://a.tile.openstreetmap.org", "https://b.tile.openstreetmap.org", "https://c.tile.openstreetmap.org"],
            connectSrc: ["'self'", "https://tile-provider-domain.com", "https://geocode.arcgis.com"],
        },
    })
);

app.listen(process.env.SERVER_PORT, (request, response) => {
    console.log(`EL servicio HTTP ha sido iniciado... \n  El servicio esta escuchando por el puerto: ${process.env.SERVER_PORT}`);
});

try {
    await db.authenticate();
    console.log("La conexion a la base de datos ha sido exitosa");
    db.sync();
    console.log("Se ha sincronizado las tablas existentes en la base de datos");
} catch {
    console.log("Ocurrio un error al intentar conectarse a la base de datos :c ");
}

app.use("/", userRoutes); // Usar rutas del usuario
app.use("/properties", propertyRoutes); // Usar rutas de las propiedades
