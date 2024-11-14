import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const port = 5000;

app.use(express.json()); //allows us to accept json data in the req.body

app.use("/api/products", productRoutes);

app.listen(port, () => {
  connectDB();
  console.log(`Server Running on port ${port}`);
});
