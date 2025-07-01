const { success } = require("zod/v4");
const resturantModel = require("../models/resturantModel");

const createResturantController = async (req,res)=>{
    try {
        const {title,imageUrl,foods,pickUp,delivery,isOpen,rating,ratingCount,code,coords} = req.body;
        if(!title || !coords){
            return res.status(400).send({
                success:false,
                message:'Fields are require'
            })
        }
        const newResturant = new resturantModel({title,imageUrl,foods,pickUp,delivery,isOpen,rating,ratingCount,code,coords});
        await newResturant.save(); 
    } catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:'Error in creating API'
    }) 
    }
}

const getAllResturantController =async (req,res)=>{
    try {
        const resturants = await resturantModel.find({}) //Here we have to return all resturants Found
        if(!resturants){
            res.status(404).send({
                success:false,
                message:'Resturant not available'
            })
        }res.status(400).send({
            success:true,
            totalCount:resturants.length,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Issue in getResturant API",
        })
    }
}

const getResturantByIDController = async (req,res)=>{
    try {
    const resturant = await resturantModel.findById(req.params.id);
    if (!resturant) {
        return res.status(404).send({
            success: false,
            message: 'resturant does not exist in DB',
        });
    }else{
        res.status(400).send({
            success:true,
            resturant
        })
    }
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in getting API'
        })
    }
}

const deleteResturantController = async (req, res) => {
  try {
    const resturantId = req.params.id;

    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: 'No Restaurant Found OR Provide Restaurant ID',
      });
    }

    const deletedResturant = await resturantModel.findByIdAndDelete(resturantId);

    if (!deletedResturant) {
      return res.status(404).send({
        success: false,
        message: 'No Restaurant Found with This ID',
      });
    }

    return res.status(400).send({
      success: true,
      message: 'Restaurant Deleted Successfully',
      data: deletedResturant,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in delete restaurant API',
      error,
    });
  }
};


module.exports = {createResturantController,getAllResturantController,getResturantByIDController,deleteResturantController}