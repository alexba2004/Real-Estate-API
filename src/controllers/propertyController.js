import Price from "../models/price.js";
import Category from "../models/category.js";
import Property from "../models/property.js";
import uploadImage from "../middlewares/uploadImage.js";
import { check, validationResult } from "express-validator";

const formProperty = async (req, res) => {
    //TODO: Obtener las categorias, y precios actuales para pintarlos en el formulario
    const [categories, prices] = await Promise.all([Category.findAll(), Price.findAll()]);
    res.render("properties/create.pug", {
        page: "New Property",
        showHeader: true,
        categories,
        prices,
        data: req.body,
    });
};

const saveNewProperty = async (req, res) => {
    await check("title").notEmpty().withMessage("The title is required").isLength({ min: 15, max: 150 }).withMessage("The title property must have between 15 and 150 characters").run(req);

    await check("description").notEmpty().withMessage("The description is required").run(req);

    await check("category").notEmpty().withMessage("All properties must be categorized").isInt({ min: 1, max: 5 }).withMessage("The category is unknown").run(req);

    await check("priceRange").notEmpty().withMessage("All properties must have a price").isInt({ min: 1, max: 8 }).withMessage("The price is unknown").run(req);

    await check("nRooms").isInt({ min: 0, max: 10 }).withMessage("The number of rooms is unknown").run(req);

    await check("nwc").isInt({ min: 0, max: 5 }).withMessage("The number of wc is unknown").run(req);

    await check("parkingLot").isInt({ min: 0, max: 5 }).withMessage("The number of parking lot is unknow").run(req);

    await check("street").notEmpty().withMessage("The name of the street is unknow").run(req);

    await check("lat").isFloat({ min: -90, max: 90 }).withMessage("the latitude is not in the requested range").run(req);

    await check("lng").isFloat({ min: -180, max: 180 }).withMessage("The length is not within the requested range.").run(req);

    //  res.json(validationResult(req))

    let resultValidate = validationResult(req);
    console.log(`lat: ${req.body.lat}, long: ${req.body.lng}`);
    let data = req.body;
    console.log(data);

    const { title, description, category, priceRange, nRooms, nwc, parkingLot, street, lat, lng } = req.body;
    // const prueba = user.userID
    console.log(`El usuario logeado es el: ${req.user.id}`);

    if (resultValidate.isEmpty()) {
        //Creamos
        const savedProperty = await Property.create({
            title,
            description,
            category,
            priceRange,
            rooms: nRooms,
            wc: nwc,
            parkinglot: parkingLot,
            street,
            lat,
            lng,
            price_ID: priceRange,
            category_ID: category,
            user_ID: req.user.id,
        });

        const uuidProperty = savedProperty.id;
        res.redirect(`/properties/addImage/${uuidProperty}`);
    } else {
        const [categories, prices] = await Promise.all([Category.findAll(), Price.findAll()]);
        res.render("properties/create.pug", {
            page: "New property",
            showHeader: true,
            categories,
            prices,
            data: req.body,
            errors: resultValidate.array(),
            propertyData: {
                title,
                description,
                category,
                priceRange,
                nRooms,
                nwc,
                parkingLot,
                street,
                lat,
                lng,
            },
        });
    }
};

const addImage = async (req, res) => {
    const { idProperty } = req.params;
    console.log(idProperty);
    //const userID = req.user.id
    const property = await Property.findByPk(idProperty);
    if (!property) {
        return res.redirect("/home");
    }
    if (property.published) {
        return res.redirect("/home");
    }
    if (req.user.id.toString() !== property.user_ID.toString()) {
        return res.redirect("/home");
    }

    res.render("properties/images", {
        property,
        page: `Add image to ${property.title}`,
        idProperty,
    });
};

const loadImage = async (req, res, next) => {
    const { idProperty } = req.params;
    console.log(idProperty);
    const property = await Property.findByPk(idProperty);
    if (!property) {
        return res.redirect("/home");
    }
    if (property.published) {
        return res.redirect("/home");
    }
    if (req.user.id.toString() !== property.user_ID.toString()) {
        return res.redirect("/home");
    }

    try {
        // Almacenar en la BD
        console.log(req.file);
        property.image = req.file.filename;
        property.published = 1;

        await property.save();

        next();
    } catch (err) {
        console.log(err);
    }
};

export { formProperty, saveNewProperty, addImage, loadImage };
