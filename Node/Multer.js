const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Upload directory path
const uploadDir = path.join(__dirname, "public", "uploads");

// Agar directory exist nahi karti, create kar do
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // file yahan save hogi
  },
  filename: function (req, file, cb) {
    const safeName = file.originalname.replace(/\s+/g, "_"); // spaces hatao
    cb(null, Date.now() + "-" + safeName); // unique filename
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed (jpeg, jpg, png)"));
  }
};

// Multer middleware
const upload = multer({ storage, fileFilter });

module.exports = upload;
