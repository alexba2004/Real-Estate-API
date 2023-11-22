import { exit } from "node:process";
import Category from "../../models/category.js";
import categories from "./categorySeed.js";
import Price from "../../models/price.js";
import prices from "./priceSeed.js";
import db from "../../config/db.js";
import chalk from "chalk";

const importData = async () => {
    try {
        await db.authenticate();
        await db.sync();
        await Promise.all(await Category.bulkCreate(categories), await Price.bulkCreate(prices));
        console.log(chalk.green("=====================================================================\nSe han importado los datos de las tablas catalogo de manera correcta\n====================================================================="));
        exit();
    } catch (error) {
        console.log(chalk.red(`=====================================================================\n${error}\n=====================================================================`));
        exit(1);
    }
};

const deleteData = async () => {
    try {
        const queryResetCategoryID = "alter table tbc_categories auto_increment = 1";
        const queryResetPriceID = "alter table tbc_prices auto_increment = 1";
        await Promise.all([Category.destroy({ where: {}, truncate: false }), Price.destroy({ where: {}, truncate: false })]);
        await Promise.all([db.query(queryResetCategoryID, { raw: true }), (queryResetPriceID, { raw: true })]);
        console.log(chalk.green("=====================================================================\nSe han eliminado los datos de las tablas catalogo de manera correcta\n====================================================================="));
        exit();
    } catch (error) {
        console.log(chalk.red(`=====================================================================\n${error}\n=====================================================================`));
        exit(1);
    }
};

if (process.argv[2] === "-i") {
    importData();
}

if (process.argv[2] === "-d") {
    deleteData();
}
