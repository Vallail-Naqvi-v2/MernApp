import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();
const app = express();

app.get("/products", async (req, res) => {
  const product = req.body; //user will send the data
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ sucess: false, messsage: "Please provide all fields" });
  }
});
app.listen(5000, () => {
  connectDB();
  console.log("server started!! on localhost 5000");
});
