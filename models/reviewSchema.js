const monsooge = require("mongoose");

const reviewSchema = monsooge.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  rating: {
    type: Number,
    require: true,
  },
  productImage: {
    type: String,
    require: true,
  },
  userId: {
    type: monsooge.Types.ObjectId,
    require: true,
    ref: "userData",
  },
  productId: {
    type: monsooge.Types.ObjectId,
    require: true,
    ref: "productData",
  },
  isActive: {
    type: Boolean,
    require: true,
    default : true
  },
});
reviewSchema.set("timestamps", true);

module.exports = monsooge.model("reviewData", reviewSchema);
