import express from "express";
import { itemController } from "../controller/itemController.js";

const router = express.Router();

router.post("/items", itemController.addItem);
router.get("/items", itemController.listItems);
router.get("/items/:id", itemController.getItemDetails);

export default router;
