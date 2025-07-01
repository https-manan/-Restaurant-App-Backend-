const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const {
  createFoodController,
  getAllFoodController,
  getFoodByIdController,
  updateFoodController,
  deleteFoodController,
} = require('../controllers/foodController');

const router = express.Router();

// CREATE FOOD
router.post('/create', authMiddleware, createFoodController);

// GET ALL FOODS
router.get('/getAll', authMiddleware, getAllFoodController);

// GET FOOD BY ID
router.get('/:id', authMiddleware, getFoodByIdController);

// UPDATE FOOD BY ID
router.put('/:id', authMiddleware, updateFoodController);

// DELETE FOOD BY ID
router.delete('/:id', authMiddleware, deleteFoodController);

module.exports = router;
