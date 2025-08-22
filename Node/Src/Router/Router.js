const express = require("express");
const {
  AddProduct,
  GetProducts,
  UpdateProduct,
  DeleteProduct,
  GetSingleProduct,
} = require("../Controller/controller");

const { Register, AdminLogin, logout } = require("../Controller/Admin");
const upload = require("../../Multer");
const Router = express.Router();
Router.post("/Add", upload.array("Images", 5), AddProduct);
Router.get("/Get", GetProducts);
Router.put("/Update", upload.array("Images", 5),UpdateProduct);
Router.delete("/Delete", DeleteProduct);
Router.get("/Singleproduct/:id", GetSingleProduct);
Router.post("/Register", Register);
Router.post("/Login", AdminLogin);
Router.post("/Logout", logout);
module.exports = Router;
