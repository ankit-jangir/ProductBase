const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      trim: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    Mobile: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
     token: {
      type: String,
      default: null,
    },
  },
);

const AdminModel = mongoose.model("Admin", AdminSchema);
module.exports = AdminModel;
