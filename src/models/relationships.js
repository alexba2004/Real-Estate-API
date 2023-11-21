import User from "./user.js";
import Property from "./property.js";
import Category from "./category.js";
import Price from "./price.js";

Property.belongsTo(User, {
    foreingKey: "user_ID",
});

Category.hasOne(Property, {
    foreingKey: "property_ID",
});

Price.hasOne(Property, {
    foreingKey: "property_ID",
});

export { User, Property, Price, Category };
