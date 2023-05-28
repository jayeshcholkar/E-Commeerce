const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  productName: {
    type: String,
    require: true,
  },
  productDetails: {
    type: String,
    require: true,
  },
  productPrice: {
    type: String,
    require: true,
  },
  productBrand: {
    type: String,
    require: true,
  },
  productCategory: {
    type: String,
    require: true,
  },
  productQuantity: {
    type: Number,
    require: true,
  },
  productStatus: {
    type: String,
    enum: ["inStock", "outOfStock", "lowInventory"],
    require: true,
    default: "inStock",
  },
  productImage: {
    type: String,
    // require: true,
  },
  vendorId: {
    type: mongoose.Types.ObjectId,
    ref: "userData",
    require: true,
  },
  isActive: {
    type: Boolean,
    require: true,
  },
});
productSchema.set("timestamps", true);

module.exports = mongoose.model("productData", productSchema);
