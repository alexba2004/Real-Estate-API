import { DataTypes } from "sequelize";
import db from "../config/db.js";

import bcrypt from "bcrypt";

// Modelo de la tabla usuarios
const User = db.define(
    "tbb_users",
    {
        name: {
            type: DataTypes.STRING, // Tipo de dato
            allowNull: false, // Obligatorios
        },

        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        token: {
            type: DataTypes.STRING,
            unique: true,
            defaultValue: "",
        },
        verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        hooks: {
            beforeCreate: async (user) => {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            },
        },
    }
);

User.prototype.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

export default User;
