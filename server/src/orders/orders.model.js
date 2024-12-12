const {Schema, model, Types} = require('mongoose');
const orderSchema = new Schema({
    orderId: String,
    products: [
        {
            productId: {type: String, required:true},
            quantity:{type: Number, required:true},
        }
    ],
    amount: Number,
    email: {type: String},
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    status:{
        type: String,
        enum: ["pending","processing","shipped","completed"],
        default:"pending"
    }
}, {timestamps:true});

const Order = new model("order", orderSchema);
module.exports = Order;