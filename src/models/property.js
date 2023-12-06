import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Property = db.define("tbb_properties", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    rooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    parkinglot: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    wc: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    street: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    lat: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    lng: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING(150),
        allowNull: false,
        defaultValue: "Por definir",
    },
    published: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
});

export default Property;
