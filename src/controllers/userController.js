import { request, response } from "express";
import User from "../models/User.js";
import { check, validationResult } from "express-validator";

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
    console.log(`===============[DATA]================\nIntentando registrar los datos del usuario en la Base de datos\nNombre: ${request.body.name}\nPassword: ${request.body.password}\n-------------------------------------`);

    await check("name").notEmpty().withMessage("This Field is required").run(request);
    await check("email").notEmpty().withMessage("This Field is required").isEmail().withMessage("This is not in email format").run(request);
    await check("password").notEmpty().withMessage("This Field is required").isLength({ min: 8 }).withMessage("The password must have 8 characters at least").run(request);
    await check("confirmPassword").notEmpty().withMessage("This Field is required").isLength({ min: 8 }).withMessage("The password must have 8 characters at least").equals(request.body.password).withMessage("Both passwords field must be the same").run(request);

    console.log(`Se encontraron: ${validationResult.length} errores de validación`);
    // response.json(validationResult(request));

    let validation = validationResult(request);

    if (validation.isEmpty()) {
        let newUser = await User.create(request.body);
    } else {
        response.render("auth/register.pug", {
            page: "New Account",
            errors: validation.array(),
        });
    }
};

export { formLogin, formRegister, formPasswordRecovery, insertUser };
