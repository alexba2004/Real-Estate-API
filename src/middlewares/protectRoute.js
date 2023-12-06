import jsonWebToken from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";
dotenv.config({
    path: "src/.env",
});
const protectRoute = async (req, res, next) => {
    const { _token } = req.cookies;
    // Verificar existencia del token
    if (!_token) {
        return res.redirect("/login");
    }
    try {
        const decoded = jsonWebToken.verify(_token, process.env.JWT_SECRET_HASH_STRING);
        const loggedUser = await User.findByPk(decoded.userID);

        if (loggedUser) {
            req.user = loggedUser;
        } else {
            return res.redirect("/login");
        }
    } catch (err) {
        console.log(err);
    }
    next();
};

export { protectRoute };
