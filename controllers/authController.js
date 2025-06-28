const userModel = require("../models/userModel");

const registerController = async (req, res) => {
    try {
        const { username, email, password, address, phone } = req.body;

        if (!username || !email || !password || !address || !phone) {
            console.log("Missing fields in request body");
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields',
            });
        }

        const existing = await userModel.findOne({ email });
        if (existing) {
            console.log(" User already exists:", email);
            return res.status(400).json({
                success: false,
                message: "Email already taken",
            });
        }

        const user = await userModel.create({
            username,
            email,
            password,
            address,
            phone,
        });

        console.log("User created:", user);

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user,
        });

    } catch (error) {
        console.error("Error in registerController:", error);
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};

module.exports = { registerController };
