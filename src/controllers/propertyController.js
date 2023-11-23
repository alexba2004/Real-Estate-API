import Property from "../models/property.js";
import Price from "../models/price.js";
import Category from "../models/category.js";
import { check, validationResult } from "express-validator";

const formProperty = async (req, res) => {
    //ToDo: Obtener los precios y categorias actuales para integrarlos al formulario
    const [categories, prices] = await Promise.all([Category.findAll(), Price.findAll()]);

    res.render("properties/create.pug", {
        page: "New Property",
        showHeader: true,
        categories,
        prices,
        data: req.body,
    });
};

const saveNewPropery = async (req, res) => {
    await check("title").notEmpty().withMessage("The title is required").isLength({ min: 15, max: 150 }).withMessage("The title property must have between 15 and 150 characters").run(req);
    await check("description").notEmpty().withMessage("The description is required").run(req);
    await check("category").notEmpty().withMessage("All properties must be categorized").isInt({ min: 1, max: 5 }).withMessage("The category is unknown").run(req);
    await check("priceRange").notEmpty().withMessage("All properties must have a price").isInt({ min: 1, max: 8 }).withMessage("The price is unknown").run(req);
    await check("nRooms").isInt({ min: 0, max: 10 }).withMessage("The number of rooms is unknown").run(req);
    await check("nwc").isInt({ min: 0, max: 5 }).withMessage("The number of bathrooms is unknown").run(req);
    await check("parkingLot").isInt({ min: 0, max: 4 }).withMessage("The number of parking lots is unknown").run(req);
};

export { formProperty, saveNewPropery };
