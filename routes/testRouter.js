const express = require('express');
const { testUserController } = require('../controllers/testController');
const router = express.Router() //router obj

router.get('/test-router',testUserController)





module.exports = router

