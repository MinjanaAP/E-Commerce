const {Schema, model, Types} = require('mongoose');

const ProductSchema = new Schema({
    name:{
        type: String, required:true
    },
    category: String,
    description: String,
    price:{
        type:Number, required: true
    },
    oldPrice: Number,
    image: String,
    image1:String,
    image2:String,
    image3:String,
    color: String,
    rating:{
        type:Number, default: 0
    },
    createdAt: {
        type:Date,
        default: Date.now
    },
    author:{
        type: Types.ObjectId, ref: "User", required: true
    }
})

const Products = new model("products", ProductSchema);

module.exports = Products;