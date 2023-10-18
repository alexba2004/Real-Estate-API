// Importaciones.
import express from "express";
import { formLogin, formRegister, formPasswordRecovery, insertUser } from "../controllers/userController.js";

// Instancia.
const router = express.Router();

// Get.
router.get("/", formLogin);
router.get("/register", formRegister);
router.get("/recovery", formPasswordRecovery);

// Post.
router.post("/register", insertUser);

// Exportación.
export default router;
