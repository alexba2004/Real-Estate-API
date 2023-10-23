import { request, response } from "express";
import User from "../models/User.js";
import { check, validationResult } from "express-validator";
import generateToken from "../lif/tokens.js";

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
    console.log(`Nombre: ${request.body.name}`);

    await check("name").notEmpty().withMessage("This field is required").run(request);
    await check("email").notEmpty().withMessage("This field is required").isEmail().withMessage("This is not in email format").run(request);
    await check("password").notEmpty().withMessage("This field is required").isLength({ min: 8 }).withMessage("This field requires at least 8 characters").run(request);
    await check("confirm-password").notEmpty().withMessage("This field is required").isLength({ min: 8 }).withMessage("This field requires at least 8 characters").equals(request.body.password).withMessage("Both passwords must be the same").run(request);

    const errors = validationResult(request);

    console.log(`Se encontraron ${errors.errors.length} errores de validación`);

    const userExists = await User.findOne({ where: { email: request.body.email } });
    console.log(userExists);

    const { name, email, password } = request.body;

    if (userExists) {
        response.render("auth/register.pug", {
            page: "New Account",
            errors: [{ msg: `The user with email "${request.body.email}" already exists` }],
            user: {
                name: request.body.name,
                email: request.body.email,
            },
        });
        console.log(request.body.email);
    } else if (errors.isEmpty()) {
        const token = generateToken();
        let newUser = await User.create({
            name,
            email,
            password,
            token,
        });
        response.json({ success: true, message: "User registered successfully" });
    } else {
        response.render("auth/register.pug", {
            page: "New Account",
            errors: errors.array(),
            user: {
                name: request.body.name,
                email: request.body.email,
            },
        });
    }
};

export { formLogin, formRegister, formPasswordRecovery, insertUser };
