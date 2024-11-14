import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";

dotenv.config();

const app = express();
const port = 5000;

app.use(express.json()); //allows us to accept json data in the req.body

app.post("/api/products", async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    return res
      .status(422)
      .json({ success: false, message: "Please provide all fields" });
  }
  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.status(201).json({ sucess: true, data: newProduct });
  } catch (error) {
    console.log(`Error ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});
app.listen(port, () => {
  connectDB();
  console.log(`Server Running on port ${port}`);
});
