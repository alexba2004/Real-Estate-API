import { exit } from "node:process";
import Category from "../../models/category.js";
import categories from "./categorySeed.js";
import db from "../../config/db.js";
import Price from "../../models/price.js";
import prices from "./priceSeed.js";

const importData = async () => {
    try {
        // Autenticar en la BD
        await db.authenticate();
        // Generar columnas de la BD
        await db.sync();
        // Importar los datos en la BD
        await Promise.all([Category.bulkCreate(categories), Price.bulkCreate(prices)]);
        console.log(`Se han importado los datos de las tablas catalogo de manera correcta`);
        exit;
    } catch (err) {
        console.log(err);
        exit(1);
    }
};

if (process.argv[2] === "-i") {
    importData();
}

const deleteData = async () => {
    try {
        const queryResetCategory = "ALTER TABLE tbc_categories AUTO_INCREMENT = 1;";
        const queryResetPrice = "ALTER TABLE tbc_prices AUTO_INCREMENT = 1;";
        await Promise.all([
            Category.destroy({
                where: {},
                truncate: false,
            }),
            Price.destroy({
                where: {},
                truncate: false,
            }),
        ]);

        await Promise.all([
            db.query(queryResetCategory, {
                raw: true,
            }),
            db.query(queryResetPrice, {
                raw: true,
            }),
        ]);
    } catch (err) {
        console.log(err);
        exit(1);
    }
};

if (process.argv[2] === "-d") {
    deleteData();
}
