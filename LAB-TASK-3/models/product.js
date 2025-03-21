const mongoose = require('mongoose');



const productSchema = new mongoose.Schema({
    name: {type: String , required: true },
    description: {type:String },
    // imageUrl: {type:String , required: false},
    quantity: {type:Number , required: true},
    price:{type:Number , required: true},
    category: { type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
});

const Product= mongoose.model("Product", productSchema)
module.exports= Product;