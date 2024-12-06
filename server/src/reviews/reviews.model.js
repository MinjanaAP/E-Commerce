const {Schema, model} = require("mongoose");

const ReviewSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    productName: {
      type: Schema.Types.String,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

const Reviews = new model("Reviews", ReviewSchema);
module.exports = Reviews;
