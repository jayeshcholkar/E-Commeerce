const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  cartQuantity: {
    type: Number,
    require: true,
  },
  Status: {
    type: String,
    enum : ['active','inactive', 'deleted'],
    require: true,
    default : 'active'
  },
  userId: {
    type: mongoose.Types.ObjectId,
    require: true,
  },
  productId: {
    type: mongoose.Types.ObjectId,
    require: true,
  },
  isActive: {
    type: Boolean,
    require: true,
    default: true,
  },
});

cartSchema.set("timestamps", true);

module.exports = mongoose.model("cartData", cartSchema);
