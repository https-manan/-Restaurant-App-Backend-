const categoryModel = require("../models/catagoryModel");

const createCatConotroller = async (req,res)=>{
    try {
        const {title,imageUrl} = req.body;
        if(!title || !imageUrl){
            res.status(200).send({
                success:false,
                message:'Provide all fields'
            })
        }
        const newCategory = new categoryModel({ title, imageUrl });  
        await newCategory.save();

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Issue in create API'
        })
    }
}


const getAllCatController = async (req, res) => {
  try {
    const categories = await categoryModel.find(); 
    res.status(200).send({
      success: true,
      message: 'All categories fetched successfully',
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'There is an issue in getAll API',
    });
  }
};



const updateCatController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;

    const updatedCategory = await categoryModel.findByIdAndUpdate( req.params.id,{ title, imageUrl },{ new: true });

    if (updatedCategory) {
      res.status(200).send({
        success: true,
        message: 'Category updated successfully',
        category: updatedCategory,
      });
    } else {
      res.status(404).send({
        success: false,
        message: 'Category not found',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'There is an issue in updateCat API',
    });
  }
};


module.exports = {createCatConotroller,getAllCatController,updateCatController}
