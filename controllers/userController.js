const userModel = require("../models/userModel")

const getUserController = async (req,res)=>{
    try {
        //Find user
        const user = await userModel.findOne({_id:req.body.id});
        //Validation
        if(!user){
            res.status(404).send({
                success:false,
                message:'User not found'
            })
        }
        //Hiding password
        user.password = undefined;
        res.status(200).send({
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

        return res.status(200).send({
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


module.exports = {getUserController,updateUserController}

