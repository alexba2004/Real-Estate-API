import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";

import db from "../config/db.js";

const User = db.define(
    "tbb_users",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        token: {
            type: DataTypes.STRING,
            defaultValue: "",
            unique: true,
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

export default User;
