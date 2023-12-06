import express from "express";
import { formLogin, formPasswordRecovery, formRegister, userHome, insertUser, confirmAccount, updatePassword, authenticateUser, emailChangePassword, formPasswordUpdate } from "../controllers/userController.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();
router.get("/", (request, response) => response.render("layout/index.pug", { page: "Home" }));
router.get("/login", formLogin); // Login
router.get("/login/register", formRegister); // Registro
router.post("/login/register", insertUser); // Registrar usuario
router.get("/login/confirm/:token", confirmAccount); // Confirmar correo
router.get("/login/password-recovery", formPasswordRecovery); // Recuperar contraseña
router.post("/login/password-recovery", emailChangePassword);
router.post("/login", authenticateUser); // Login funcional
router.get("/login/update-password/:token", formPasswordUpdate); // Comprobar token
router.post("/login/update-password/:token", updatePassword);
router.get("/home", userHome); // Vista de del home de los usuarios

export default router;
