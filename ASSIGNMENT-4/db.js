const mongoose = require("mongoose");

const connectDB = async ()=>{
    const connectionString= "mongodb://localhost:27017/morrisons-adminPanel";

    try{
        await mongoose.connect(connectionString);
        console.log("Connected to Mongodb");
    } catch(error)
    {
        console.error("Connection Error:", error.message);
        process.exit(1);
    }
};

module.exports =connectDB;