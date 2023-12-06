import express from "express";
import { protectRoute } from "../middlewares/protectRoute.js";
import { formProperty, saveNewProperty, addImage, loadImage } from "../controllers/propertyController.js";
import upload from "../middlewares/uploadImage.js";

const router = express.Router();

router.get("/create", protectRoute, formProperty);
router.post("/create", protectRoute, saveNewProperty);

router.get("/addImage/:idProperty", protectRoute, addImage);

router.post("/addImage/:idProperty", protectRoute, upload.single("image"), loadImage);

export default router;
