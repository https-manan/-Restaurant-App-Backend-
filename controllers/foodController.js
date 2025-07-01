const foodModel = require('../models/foodModel');

// CREATE FOOD
const createFoodController = async (req, res) => {
  try {
    const food = new foodModel(req.body);
    await food.save();
    res.status(201).send({
      success: true,
      message: 'Food created successfully',
      food,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Error creating food',
      error,
    });
  }
};

// GET ALL FOODS
const getAllFoodController = async (req, res) => {
  try {
    const foods = await foodModel.find().populate('resturant');
    res.status(200).send({
      success: true,
      message: 'All food items fetched successfully',
      foods,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Error fetching food items',
      error,
    });
  }
};

// GET FOOD BY ID
const getFoodByIdController = async (req, res) => {
  try {
    const food = await foodModel.findById(req.params.id).populate('resturant');
    if (!food) {
      return res.status(404).send({
        success: false,
        message: 'Food not found',
      });
    }
    res.status(200).send({
      success: true,
      message: 'Food fetched successfully',
      food,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Error fetching food',
      error,
    });
  }
};

// UPDATE FOOD
const updateFoodController = async (req, res) => {
  try {
    const food = await foodModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!food) {
      return res.status(404).send({
        success: false,
        message: 'Food not found',
      });
    }
    res.status(200).send({
      success: true,
      message: 'Food updated successfully',
      food,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Error updating food',
      error,
    });
  }
};

// DELETE FOOD
const deleteFoodController = async (req, res) => {
  try {
    const food = await foodModel.findByIdAndDelete(req.params.id);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: 'Food not found',
      });
    }
    res.status(200).send({
      success: true,
      message: 'Food deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Error deleting food',
      error,
    });
  }
};

module.exports = {createFoodController,  getAllFoodController, getFoodByIdController,  updateFoodController, deleteFoodController,};
