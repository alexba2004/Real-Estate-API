import Property from "../models/property.js";
import Price from "../models/price.js";
import Category from "../models/category.js";

const formProperty = async (req, res) => {
    //ToDo: Obtener los precios y categorias actuales para integrarlos al formulario
    const [categories, prices] = await Promise.all([Category.findAll(), Price.findAll()]);

    res.render("properties/create.pug", {
        page: "New Property",
        showHeader: true,
        categories,
        prices,
    });
};

export { formProperty };
