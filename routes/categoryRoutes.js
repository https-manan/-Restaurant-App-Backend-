const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createCatConotroller, getAllCatController, updateCatController } = require('../controllers/categoryController');
const routes = express.Router();

//CREATE NEW CATEGORY
routes.post('/create',authMiddleware,createCatConotroller)

//GET ALL CATEGORY
routes.get('/getAll',authMiddleware,getAllCatController)

//UPDATE CAT BY ID

routes.put('/getById/:id',authMiddleware,updateCatController)




module.exports = routes