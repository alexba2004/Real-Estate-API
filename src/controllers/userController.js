import User from "../models/user.js";
import { check, validationResult } from "express-validator";
import { generateToken, generateJwt } from "../lib/tokens.js";
import bcrypt from "bcrypt";
import jsonWebToken from "jsonwebtoken";
import { emailRegister, emailPasswordRecovery } from "../lib/emails.js";

const formLogin = (request, response) => {
    response.render("../views/auth/login.pug", {
        isLogged: false,
        page: "Login",
    });
};

const formPasswordUpdate = async (request, response) => {
    const { token } = request.params;
    const user = await User.findOne({ where: { token } });
    console.log(user);
    if (!user) {
        response.render("auth/confirm-account", {
            page: "Password Recovery",
            error: true,
            msg: "We have found some issues and could not verify your account.",
            button: "Access denied",
        });
    }

    response.render("auth/password-update", {
        isLogged: false,
        page: "Password Update",
    });
};

const formRegister = (request, response) => {
    response.render("auth/register.pug", {
        page: "Creating a new account...",
    });
};

const formPasswordRecovery = (request, response) => {
    response.render("auth/recovery.pug", {
        page: "Password Recovery",
    });
};

const insertUser = async (req, res) => {
    console.log("Intentando registrar los datos del nuevo usuario en la Base de Datos");
    console.log(`Nombre: ${req.body.name}`);
    // Validaciones
    await check("name").notEmpty().withMessage("YOUR NAME IS REQUIRED").run(req); //* Express checa el nombre que no venga vacio AHORA MISMO
    await check("email").notEmpty().withMessage("YOUR EMAIL IS REQUIRED").isEmail().withMessage("THIS ISN'T EMAIL FORMAT").run(req);
    await check("password").notEmpty().withMessage("YOUR PASSWORD IS REQUIRED").isLength({ min: 8, max: 20 }).withMessage("YOUR PASSWORD MUST HAVE 8 CHARACTERS AT LEAST").run(req);
    await check("confirmPassword").notEmpty().withMessage("YOUR PASSWORD IS REQUIRED").isLength({ min: 8, max: 20 }).withMessage("YOUR PASSWORD MUST HAVE 8 CHARACTERS AT LEAST").equals(req.body.password).withMessage("BOTH PASSWORDS FIELDS MUST BE THE SAME").run(req);

    console.log(`El total de errores fueron de: ${validationResult.length} errores de validación`);

    let resultValidate = validationResult(req);
    const userExists = await User.findOne({
        where: {
            email: req.body.email,
        },
    });

    const { name, email, password } = req.body;

    if (userExists) {
        res.render("auth/register.pug", {
            page: "New Account",
            errors: [{ msg: `the user ${req.body.email} already exist` }],
            user: {
                name: req.body.name,
                email: req.body.email,
            },
        });
    } else if (resultValidate.isEmpty()) {
        const token = generateToken();
        // Creación del usuario
        let newUser = await User.create({
            name,
            email,
            password,
            token,
        });
        res.render("templates/message.pug", {
            page: "Account Created Successfully!",
            message: email,
            type: "success",
        });

        emailRegister({ email, name, token });
    } else {
        res.render("auth/register.pug", {
            page: "New Account",
            errors: resultValidate.array(),
            user: {
                name: req.body.name,
                email: req.body.email,
            },
        });
    }
};

const confirmAccount = async (req, res) => {
    const tokenRecived = req.params.token;
    const userOwner = await User.findOne({
        where: {
            token: tokenRecived,
        },
    });
    if (!userOwner) {
        console.log("El token no existe");
        res.render("auth/confirm-account", {
            page: "Status Verification.",
            error: true,
            msg: "We have found some issues and could not verify your account.",
            button: "Access denied",
        });
    } else {
        console.log("El token existe");
        userOwner.token = null;
        userOwner.verified = true;
        await userOwner.save();
        // Update de la BD
        res.render("auth/confirm-account", {
            page: "Status Verification.",
            error: false,
            msg: "Your account has been confirmed successfuly.",
            button: "Now you can login",
        });
    }
};

const updatePassword = async (req, res) => {
    console.log(`Guardando password`);

    await check("password").notEmpty().withMessage("YOUR PASSWORD IS REQUIRED").isLength({ min: 8 }).withMessage("YOUR PASSWORD MUST HAVE 8 CHARACTERS AT LEAST").run(req);
    await check("confirmPassword").notEmpty().withMessage("YOUR PASSWORD IS REQUIRED").isLength({ min: 8 }).withMessage("YOUR PASSWORD MUST HAVE 8 CHARACTERS AT LEAST").equals(req.body.password).withMessage("BOTH PASSWORDS FIELDS MUST BE THE SAME").run(req);
    let resultValidate = validationResult(req);
    if (resultValidate.isEmpty()) {
        const { token } = req.params;
        const { password } = req.body;
        const user = await User.findOne({ where: { token } });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        user.token = null;
        await user.save();
        res.render("auth/confirm-account.pug", {
            page: "Password Recovery",
            button: "Back to login",
            msg: "The password has been change succesfully",
        });
    } else {
        res.render("auth/password-update.pug", {
            page: "New Account",
            errors: resultValidate.array(),
        });
    }
};

const emailChangePassword = async (req, res) => {
    console.log(`El usuario ha solicitado cambiar su contraseña por lo que se le enviara un correo electronico a ${req.body.email} con la liga para actualizar su contraseña.`);
    await check("email").notEmpty().withMessage("YOUR EMAIL IS REQUIRED").isEmail().withMessage("THIS IS NOT EMAIL FORMAT").run(req);
    let resultValidate = validationResult(req);
    const { name, email } = req.body;

    if (resultValidate.isEmpty()) {
        const userExists = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (!userExists) {
            //Si no existe
            console.log(`El usuario: ${email} que esta intentando recuperar su contraseña no existe`);
            res.render("templates/message.pug", {
                page: "User Not Found",
                part1: `The user associated with: `,
                part2: ` does not exist in database.`,
                message: `${email}`,
                type: "error",
            });
        } else {
            console.log("envio de correo");
            const token = generateToken();
            userExists.token = token;
            userExists.save();

            emailPasswordRecovery({ name: userExists.name, email: userExists.email, token: userExists.token });

            res.render("templates/message", {
                page: "Email Send",
                message: `${email}`,
                type: "success",
            });
        }
    } else {
        res.render("auth/recovery", {
            page: "Status Verification.",
            error: false,
            msg: "Your account has been confirmed successfuly.",
            button: "Now you can login",
            errors: resultValidate.array(),
            user: {
                name: req.body.name,
                email: req.body.email,
            },
        });
    }
    return 0;
};

const authenticateUser = async (request, response) => {
    // Verificaciones del login
    await check("email").notEmpty().withMessage("Email field is required").isEmail().withMessage("This is not in email format").run(request);
    await check("password").notEmpty().withMessage("Password field is required").isLength({ max: 20, min: 8 }).withMessage("Password must contain between 8 and 20 characters").run(request);

    let resultValidation = validationResult(request);
    if (resultValidation.isEmpty()) {
        const { email, password } = request.body;
        console.log(`El usuario: ${email} esta intentando acceder a la plataforma`);

        const userExists = await User.findOne({ where: { email } });

        if (!userExists) {
            console.log("El ususario no existe");
            response.render("auth/login.pug", {
                page: "Login",
                errors: [{ msg: `The user associated to: ${email} was not found` }],
                user: {
                    email,
                },
            });
        } else {
            console.log("El usuario existe");
            if (!userExists.verified) {
                console.log("Existe, pero no esta verificado");

                response.render("auth/login.pug", {
                    page: "Login",
                    errors: [{ msg: `The user associated to: ${email} was found but not verified` }],
                    user: {
                        email,
                    },
                });
            } else {
                if (!userExists.verifyPassword(password)) {
                    response.render("auth/login.pug", {
                        page: "Login",
                        errors: [{ msg: `User and password does not match` }],
                        user: {
                            email,
                        },
                    });
                } else {
                    console.log(`El usuario: ${email} Existe y esta autenticado`);
                    //Generar el token de accesso
                    const token = generateJwt(userExists.id);
                    response
                        .cookie("_token", token, {
                            httpOnly: true,
                        })
                        .redirect("/home");
                }
            }
        }
    } else {
        response.render("../views/auth/login.pug", {
            page: "Login",
            errors: resultValidation.array(),
            user: {
                email: request.body.email,
            },
        });
    }

    return 0;
};

const userHome = async (req, res) => {
    const token = req.cookies._token;
    const decoded = jsonWebToken.verify(token, process.env.JWT_SECRET_HASH_STRING);
    const loggedUser = await User.findByPk(decoded.userID);
    console.log(token);
    res.render("user/home", {
        showHeader: true,
        page: "Home",
        loggedUser,
    });
};

export { formLogin, formRegister, formPasswordRecovery, formPasswordUpdate, insertUser, authenticateUser, confirmAccount, updatePassword, emailChangePassword, userHome };
