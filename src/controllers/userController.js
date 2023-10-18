import { request, response } from "express";
import User from "../models/User.js";

const formLogin = (req, res) => {
    res.render("auth/login.pug", { isLoged: false });
};

const formRegister = (reqt, resp) => {
    resp.render("auth/register.pug", {
        page: "Creating a new account...",
    });
};

const formPasswordRecovery = (request, response) => {
    response.render("auth/recovery.pug", {
        page: "Password Recovery",
    });
};

const insertUser = async (request, response) => {
    console.log(`===============[DATA]================\nIntentando registrar los datos del usuario en la Base de datos\nNombre: ${request.body.name}\n-------------------------------------`);
    let newUser = await User.create(request.body);
};

export { formLogin, formRegister, formPasswordRecovery, insertUser };
