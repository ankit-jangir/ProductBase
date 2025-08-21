const AdminModel = require("../model/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Register = async (req, res) => {
    try {
        const { Name, Email, Mobile, password } = req.body;

        if (!Email || !password) {
            return res.status(400).json({ message: "Email & password required" });
        }
        const exist = await AdminModel.findOne({ Email });
        if (exist) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let Admincreate = new AdminModel({
            Name,
            Email,
            Mobile,
            password: hashedPassword,
        });

        await Admincreate.save();
        const responseData = Admincreate.toObject();
        delete responseData.password;

        res.status(200).json({
            message: "Successfully Registered",
            data: responseData,
        });
    } catch (error) {
        console.log(error);
    }
};

const AdminLogin = async (req, res) => {
    try {
        const { Email, password } = req.body;
        const admin = await AdminModel.findOne({ Email });
        if (!admin) {
            return res.status(400).json({ message: "Invalid Email" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Password" });
        }
        const token = jwt.sign(
            { id: admin._id, email: admin.Email },
            process.env.JWT_SECRET || "mysecretkey",
            { expiresIn: "1d" }
        );

        admin.token = token;
        await admin.save();

        const responseData = admin.toObject();
        delete responseData.password;

        res.status(200).json({
            message: "Login successful",
            token,
            data: responseData,
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    Register,
    AdminLogin
};
