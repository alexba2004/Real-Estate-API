// Configuración de Sequelize.
import { Sequelize } from "sequelize";

const db = new Sequelize("rs-220103", "briones22", "12345", {
    host: "localhost",
    port: 3309,
    dialect: "mysql",
    define: {
        timestamps: true,
    },
    // Propiedades de usuarios.
    pool: {
        max: 5, // Cantidad de usuarios.
        min: 0,
        acquire: 30000, // El tiempo que va a esperar a recibir una peticion.
        idle: 10000, // Suspende la conexión mientras no se ingresa nada.
    },
    // Desactiva los alias de la base de datos.
    operatorAliases: false,
});

export default db;
