const express = require("express");
const {
  AddProduct,
  GetProducts,
  UpdateProduct,
  DeleteProduct,
  GetSingleProduct,
} = require("../Controller/controller");
const upload = require("../Middleware/Multer");
const { Register, AdminLogin } = require("../Controller/Admin");
const Router = express.Router();
Router.post("/Add", upload.array("Images", 2), AddProduct);
Router.get("/Get", GetProducts);
Router.put("/Update", UpdateProduct);
Router.delete("/Delete", DeleteProduct);
Router.get("/Singleproduct/:id", GetSingleProduct);
Router.post("/Register", Register);
Router.post("/Login", AdminLogin);
module.exports = Router;
