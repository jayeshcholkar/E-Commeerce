const cartSchema = require("../models/cartSchema");
const productSchema = require("../models/productSchema");

const addToCart = async (req, res) => {
  const { cartQuantity } = req.body;
  const { id } = req.params;
  const product = await productSchema.findById(id);
  const cart = new cartSchema(req.body);
  try {
    if (product) {
      cart.userId = req.user._id;
      cart.productId = product._id;
      if (product.productQuantity < cartQuantity) {
        cart.cartQuantity = product.productQuantity;
        await cart.save();
        res.status(201).json({
          success: true,
          message: "Products added to cart",
        });
      } else {
        await cart.save();
        res.status(201).json({
          success: true,
          message: "Products added to cart",
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "Product not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

module.exports = { addToCart };
