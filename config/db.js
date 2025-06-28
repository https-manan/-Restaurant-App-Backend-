const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Db connectes');
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDb;