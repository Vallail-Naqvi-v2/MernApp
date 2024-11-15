import Product from "../models/product.model.js";
import mongoose from "mongoose";

//Gets all products
export const getProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({});
    res.status(200).json({ success: true, data: allProducts });
  } catch (error) {
    console.log(`could not find products${error}`);
  }
};

//creates a prodcut
export const createProduct = async (req, res) => {
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
};

//deletes a product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  //   console.log(id);

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//updates a product
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  // Check if the id is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "No product with this id" });
  }

  try {
    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });

    // Check if product was found and updated
    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Return updated product
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.log(`Server Error ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
