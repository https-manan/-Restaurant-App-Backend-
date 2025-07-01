const userModel = require("../models/userModel")
const bcrypt = require('bcrypt')
const getUserController = async (req,res)=>{
    try {
        const user = await userModel.findOne({_id:req.user.id});
        if(!user){
            res.status(404).send({
                success:false,
                message:'User not found'
            })
        }
        user.password = undefined;
        res.status(400).send({
            success:true,
            message:'User get successfully',
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in get user API',
            error
        })
    }
}



//UPDATE USER   
const updateUserController = async (req, res) => {
    try {
        const { id, username, email, password, address, phone } = req.body;

        if (!id) {
            return res.status(400).send({
                success: false,
                message: 'User ID is required',
            });
        }

        const user = await userModel.findById(id);

        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found in DB',
            });
        }

        if (username) user.username = username;
        if (address) user.address = address;
        if (phone) user.phone = phone;

        await user.save();

        return res.status(400).send({
            success: true,
            message: 'User updated successfully',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'An issue occurred',
        });
    }
};



//RESET PASSWORD
const resetPasswordController = async (req, res) => {
    try {
        const { email, newPassword, answer } = req.body;

        if (!email || !newPassword || !answer) {
            return res.status(400).send({
                success: false,
                message: 'Enter full details',
            });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found in DB',
            });
        }

        if (user.answer !== answer) {
            return res.status(401).send({
                success: false,
                message: 'Security answer is incorrect',
            });
        }

        const newHashPass = await bcrypt.hash(newPassword, 10);
        user.password = newHashPass;
        await user.save();

        res.status(400).send({
            success: true,
            message: 'Password has been reset successfully',
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in reset API',
        });
    }
};

const delProfileController = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User does not exist in DB',
            });
        }

        await userModel.deleteOne({ _id: req.params.id });

        return res.status(400).send({
            success: true,
            message: 'User deleted successfully',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Issue in deleting API',
        });
    }
};


module.exports = {getUserController,updateUserController,delProfileController,resetPasswordController}

