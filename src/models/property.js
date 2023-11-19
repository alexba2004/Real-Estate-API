import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Property = db.define("tbb_properties", {
    title: {
        // Titulo de la propiedad
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    description: {
        // Descripcion
        type: DataTypes.TEXT,
        allowNull: false,
    },
    rooms: {
        // Habitaciones
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    parkingLot: {
        // Estacionamientos
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    wc: {
        // Baños
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userID: {
        // ID del usuario
        type: DataTypes.INTEGER,
        allowNull: true,
    },
});

export default Property;
