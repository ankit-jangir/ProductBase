const mongoose = require('mongoose')
const url = "mongodb://localhost:27017/block"
const mongoodb = () => {
    try {
        mongoose.connect(url)
        console.log("mongoodb is connected....");
    } catch (error) {
        console.log(error);
    }
}
mongoodb()
module.exports = mongoodb

