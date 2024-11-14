import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";
const router = express.Router();

//get all prodcuts
router.get("/", getProducts);

//create a prodcut
router.post("/", createProduct);

//delete a product
router.delete("/:id", deleteProduct);

// Update a product
router.put("/:id", updateProduct);

export default router;
