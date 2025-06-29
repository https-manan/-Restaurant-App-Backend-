const bcrypt = require('bcrypt');
const userModel = require("../models/userModel");          
const jwt = require('jsonwebtoken');

const registerController = async (req, res) => {
    try {
        const { username, email, password, address, phone } = req.body;
        const hashedPass = await bcrypt.hash(password,10);

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
            password: hashedPass,
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



const loginController = async (req,res)=>{
    const {email,password} = req.body;
      if (!email || !password ) {
            console.log("Missing fields in request body");
            return res.status(500).json({
                success: false,
                message: 'Please provide all required fields',
            });
        }
       
     try {
        const user = await userModel.findOne({email});
        const isMatch = await bcrypt.compare(password, user.password); 
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})
        if(user && isMatch){
            return res.status(200).json({
            success: true,
            token,
            message: "User logined successfully"
        });  
    }else{
            return res.status(404).json({
            success: false,
            message: "SignUp! User donsen't exist in DB"
        });
    }
     } catch (error) {
        console.log(error);
            return res.status(500).json({
            success: false,
            message: "Error in login API",
            error: error.message,
        });
     }   
}





module.exports = { registerController,loginController };
