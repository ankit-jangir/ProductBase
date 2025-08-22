const express = require('express');
const Router = require('./Src/Router/Router');
const app = express();
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

const port = 7777;
require('./Src/confic/confic');
app.use(Router);

app.use(express.static(path.join(__dirname, "public/uploads")));

app.listen(port, () => {
    console.log(`server is connected ${port}`);
});
