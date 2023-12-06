import Sequelize from "sequelize";
import dotenv from "dotenv";
dotenv.config({
    path: "src/.env",
});

// Seguridad de la BD
const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    timezone: "-06:00",
    define: {
        Timestamps: true,
    },
    pool: {
        max: 5, // Maximo y minimo de usuarios
        min: 0,
        acquire: 30000, // 30000 milisegundos
        iddle: 10000, // Suspender la conexion para escalabilidad
    },
    operatorAliases: false, // Desactiva los renombramientos
});

export default db;
