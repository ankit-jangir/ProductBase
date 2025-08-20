const express = require('express');
const Router = require('./Src/Router/Router');
const app = express();
const path = require("path");
app.use(express.json());
const port = 7777;
require('./Src/confic/confic');
app.use(Router);
app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));

app.listen(port, () => {
    console.log(`server is connected ${port}`);
})