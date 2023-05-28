const productSchema = require("../models/productSchema");
const reviewSchema = require("../models/reviewSchema");

const addProduct = async (req, res) => {
  const productData = new productSchema(req.body);
  try {
    if (req.user.userRole === "vendor") {
      if (productData !== null) {
        productData.vendorId = req.user._id;
        productData.save();
        res.status(201).json({
          success: false,
          message: "Product added successfully",
          product: productData,
        });
      } else {
        res.status(403).json({
          success: false,
          message: "Something went wrong",
        });
      }
    } else {
      res.status(401).json({
        success: false,
        message: "You are not authorized",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

const productList = async (req, res) => {
  try {
    let { user, query } = req;
    const { product, search, filter, sort, page } = query;
    const role = user.userRole;
    let where;
    let perPage = 5;
    let sorting = {
      productPrice: sort,
      createdAt: sort,
    };
    where = {
      $or: [
        { productName: { $regex: search, $options: "i" } },
        { productCategory: { $regex: search, $options: "i" } },
      ],
      productBrand: { $regex: filter, $options: "i" },
    };
    if (product == "myproduct" && role == "vendor") {
      where = {
        vendorId: user._id,
      };
    }
    const productData = await productSchema
      .find(where)
      .limit(perPage)
      .skip(perPage * page)
      .sort(sorting);
    if (productData[0] !== undefined) {
      res.status(200).json({
        success: true,
        message: "Product fetched succesfully",
        products: productData,
        result: productData.length,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Product not available",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

const productDetails = async (req, res) => {
  const productData = await productSchema
    .findById(req.params.pid)
    .populate({ path: "vendorId", select: "userName" });
  const reviewData = await reviewSchema
    .find({ productId: req.params.pid })
    .populate({ path: "userId", select: "userName" });
  try {
    if (productData !== null) {
      res.status(201).json({
        success: true,
        message: "Product details fetched successfully",
        product: productData,
        review: reviewData,
      });
    } else {
      res.status(404).json({
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

const deleteProduct = async (req, res) => {
  try {
    const product = await productSchema.findById(req.params.id);
    if (product) {
      if (
        req.user.userRole === "vendor" &&
        req.user._id === product.vendorId.toString()
      ) {
        await productSchema.findByIdAndDelete(req.params.id);
        res.status(202).json({
          success: false,
          message: "Product deleted successfully",
        });
      } else {
        res.status(401).json({
          success: false,
          message: "You are not authorized",
        });
      }
    } else {
      res.status(404).json({
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

const updateProduct = async (req, res) => {
  try {
    const product = await productSchema.findById(req.params.id);
    if (product) {
      if (
        req.user.userRole === "vendor" &&
        req.user._id === product.vendorId.toString()
      ) {
        const updated = await productSchema.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );
        res.status(202).json({
          success: false,
          message: "Product updated successfully",
          product: updated,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "You are not authorized",
        });
      }
    } else {
      res.status(404).json({
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

module.exports = {
  addProduct,
  productList,
  deleteProduct,
  updateProduct,
  productDetails,
};
