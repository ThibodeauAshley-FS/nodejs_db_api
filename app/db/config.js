const mongoose = require('mongoose');

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.mongoDBURL, {
            useNewUrlParser: true,
            useunifiedTolology: true,
        });
        console.log(`MongoDB connection successful`);
    }
    catch (err){
        console.error(err);
        process.exit(1);

    }
}

module.exports = connectDB;