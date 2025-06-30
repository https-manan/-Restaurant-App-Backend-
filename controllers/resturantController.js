const resturantMode = require("../models/resturantMode");

const createResturantController = async (req,res)=>{
    try {
        const {title,imageUrl,foods,pickUp,delivery,isOpen,rating,ratingCount,code,coords} = req.body;
        if(!title || !coords){
            return res.status(200).send({
                success:false,
                message:'Fields are require'
            })
        }
        const newResturant = new resturantMode({title,imageUrl,foods,pickUp,delivery,isOpen,rating,ratingCount,code,coords});
        await newResturant.save(); 
    } catch (error) {
       console.log(error);
       res.status(500).send({
        success:false,
        message:'Error in creating API'
       }) 
    }
}



module.exports = {createResturantController}