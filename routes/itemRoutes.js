import express from "express";
import { itemController } from "../controller/itemController.js";

const router = express.Router();

router.post("/", itemController.addItem);
router.get("/", itemController.listItems);
router.get("/:id", itemController.getItemDetails);

export default router;
