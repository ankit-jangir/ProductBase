const mongoose = require("mongoose");
const ProductModel = require("../model/Product");

const AddProduct = async (req, res) => {
    try {
        const { Product_Name, Description, Meta_Description, Tags } = req.body;

        if (!Product_Name || !Description) {
            return res
                .status(400)
                .json({ message: "Product name & description required" });
        }

        const imagePaths = req.files
            ? req.files.map((file) => `/uploads/${file.filename}`)
            : [];
        let tagsArray = [];
        if (Tags) {
            if (Array.isArray(Tags)) {
                tagsArray = Tags;
            } else {
                tagsArray = [Tags];
            }
        }

        const newProduct = await ProductModel.create({
            Product_Name,
            Description,
            Meta_Description,
            Product_Images: imagePaths,
            Tags: tagsArray,
        });

        res.status(201).json({
            message: "Product added successfully",
            data: newProduct,
        });
    } catch (error) {
        console.error("Error in AddProduct:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


const GetProducts = async (req, res) => {
    try {
        const products = await ProductModel.find();
        res
            .status(200)
            .json({ message: "Products fetched successfully", data: products });
    } catch (error) {
        console.log(error);
    }
};

const UpdateProduct = async (req, res) => {
  try {
    const { id } = req.query;
    const { Product_Name, Description, Meta_Description, Product_Images } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      { Product_Name, Description, Meta_Description, Product_Images },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Update error:", error);
  }
};


const DeleteProduct = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: "Id is required" });
        }
        const deleteProduct = await ProductModel.findByIdAndDelete(id);
        if (!deleteProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res
            .status(200)
            .json({ message: "Product delete successfully", data: deleteProduct });
    } catch (error) {
        console.log(error);
    }
};

const GetSingleProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Id is required" });
        }

        const Singleproduct = await ProductModel.findById(id);

        if (!Singleproduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({
            message: "Product fetched successfully",
            data: Singleproduct,
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    AddProduct,
    GetProducts,
    UpdateProduct,
    DeleteProduct,
    GetSingleProduct,
};
