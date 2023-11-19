import express, { urlencoded } from "express";
import generalRoutes from "./routes/generalRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import db from "./config/db.js";
import User from "./models/user.js";
import Property from "./models/property.js";
import helmet from "helmet";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";

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

//app.use('/', generalRoutes); //!Mi reto
app.use("/", userRoutes); //!Del usuario
app.use("/properties", propertyRoutes); //!De las propiedades
//* script( src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js") le da la funcionalidad al mapa y los otros 4
