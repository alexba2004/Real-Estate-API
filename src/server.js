import express, { urlencoded } from "express";
import userRoutes from "./routes/userRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import db from "./config/db.js";
import { User, Property } from "./models/relationships.js";
import helmet from "helmet";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import chalk from "chalk";

dotenv.config({
    path: "src/.env",
});

//*Instanciamos el modulo
const app = express();
app.use(
    express.urlencoded({
        extended: false,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev")); //*ESTA ES MIA SOLO PARA LOS ESTATUS DE LA PETICION

// HABILITAR COOKIEPARSER PARA LEER, ESCRIBIR Y ELIMINAR EN LAS COOKIES DEL NAVEGADOR.
app.use(
    cookieParser({
        cookie: true,
    })
);

//TEMPLATE ENGINE
app.set("view engine", "pug");
app.set("views", "./src/views");
app.use(express.static("./src/public"));

//HABILITAR LA PROTECCION A TRAVES DE HELMET
//NOS FALRA UNA SEGURIDAD NUEVA
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

db.authenticate()
    .then(() => {
        console.log(chalk.green("============================================================="));
        console.log(chalk.green("Conexión a la base de datos establecida con éxito"));
        console.log(chalk.green("============================================================="));

        return db.sync();
    })
    .then(() => {
        console.log(chalk.green("============================================================="));
        console.log(chalk.green("Se han sincronizado las tablas existentes en la base de datos"));
        console.log(chalk.green("============================================================="));
    })
    .catch((error) => {
        console.error(chalk.red("============================================================="));
        console.error(chalk.red("Error al conectar a la base de datos:", error));
        console.error(chalk.red("============================================================="));
    });

// Iniciar el servicio HTTP
app.listen(process.env.SERVER_PORT, () => {
    console.log(chalk.green("=========================[DATA BASE]========================="));
    console.log(chalk.green("El servicio HTTP ha sido iniciado"));
    console.log(chalk.green("============================================================="));
    console.log(chalk.green(`El servicio está escuchando en el puerto: ${process.env.SERVER_PORT}`));
    console.log(chalk.green("============================================================="));
});

//app.use('/', generalRoutes); //!Mi reto
app.use("/", userRoutes); //!Del usuario
app.use("/properties", propertyRoutes); //!De las propiedades
//* script( src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js") le da la funcionalidad al mapa y los otros 4
