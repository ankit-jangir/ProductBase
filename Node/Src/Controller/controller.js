const ProductModel = require("../model/Product");

const AddProduct = async (req, res) => {
    try {
        const { Product_Name, Description, Meta_Description } = req.body;

        if (!Product_Name || !Description) {
            return res.status(400).json({ message: "Product name & description required" });
        }

        const imagePaths = req.files
            ? req.files.map((file) => `/uploads/${file.filename}`)
            : [];

        const newProduct = await ProductModel.create({
            Product_Name,
            Description,
            Meta_Description,
            Product_Images:imagePaths,
        });

        res.status(201).json({
            message: "Product added successfully",
            data: newProduct,
        });
    } catch (error) {
        console.error("Error in AddProduct:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const GetProducts = async (req, res) => {
    try {
        const products = await ProductModel.find()
        res.status(200).json({ message: "Products fetched successfully", data: products })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error: error.message })
    }
}

const UpdateProduct = async (req, res) => {
    try {
        const { id, Product_Name, Description, Meta_Description, Product_Images } = req.body
        if (!id) {
            return res.status(400).json({ message: "Id is required" })
        }
        const UpdateProduct = await ProductModel.findByIdAndUpdate(
            id,
            {
                Product_Name,
                Description,
                Meta_Description,
                Product_Images
            },
            { new: true }
        );
        if (!UpdateProduct) {
            return res.status(400).json({ message: "Product not found" })
        }
        res.status(200).json({
            message: "Product updated successfully",
            data: UpdateProduct
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error: error.message })

    }
}

const DeleteProduct = async (req, res) => {
    try {
        const { id } = req.body
        if (!id) {
            return res.status(400).json({ message: "Id is required" })
        }
        const deleteProduct = await ProductModel.findByIdAndDelete(id)
        if (!deleteProduct) {
            return res.status(404).json({ message: "Product not found" })
        }
        res.status(200).json({ message: "Product delete successfully", data: deleteProduct })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error: error.message })
    }
}

const GetSingleProduct = async (req, res) => {
    try {
        const { id } = req.body
        if (!id) {
            return res.status(400).json({ message: "Id is required" })
        }
        const Singleproduct = await ProductModel.findById(id)

        if (!Singleproduct) {
            return res.status(404).json({ message: "Product is not found" })
        }
        res.status(200).json({ message: "Products fetched successfully", data: Singleproduct })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error: error.message })

    }
}

module.exports = { AddProduct, GetProducts, UpdateProduct, DeleteProduct, GetSingleProduct };
