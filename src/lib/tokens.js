import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { v4 } from "uuid";
import { UUID } from "sequelize";
dotenv.config({
    path: "src/.env",
});

console.log(UUID);

// Token propio
const generateToken = () => Math.random().toString(32).substring(3) + Date.now().toString(32) + Math.random().toString(32).substring(3); //* numero aleatorio, fecha, numero aleatorio
//  JWT
const generateJwt = (userID) =>
    jwt.sign(
        {
            domain: process.env.JWT_DOMAIN,
            signature: process.env.JWT_SIGNATURE,
            author: process.env.JWT_AUTHOR,
            year: process.env.JWT_YEAR,
            userID,
        },
        process.env.JWT_SECRET_HASH_STRING,
        {
            expiresIn: "1d",
        }
    );

export { generateToken, generateJwt };
