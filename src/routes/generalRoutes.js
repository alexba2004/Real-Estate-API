import express from "express";
import { findAll, insertOne, findOneById, findOneByUserId, updateOne, deleteOne } from "../controllers/retoController.js";
const router = express.Router();

router.get("/", (request, response) => response.render("layout/index.pug", { page: "Home" }));
router.post("/insertOne", insertOne);
router.get("/findOneById/:id", findOneById);
router.get("/findOneByUserId/:userID", findOneByUserId);
router.put("/updateOne/:id", updateOne);
router.delete("/deleteOne/:id", deleteOne);
router.get("/findAll", findAll);

export default router;
