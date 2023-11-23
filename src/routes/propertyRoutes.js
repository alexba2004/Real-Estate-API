import express from "express";
import { formProperty, saveNewPropery } from "../controllers/propertyController.js";
const router = express.Router();

router.get("/create", formProperty);
router.post("/create", saveNewPropery);

export default router;
