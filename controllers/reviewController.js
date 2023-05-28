const reviewSchema = require("../models/reviewSchema");

const addReview = async (req, res) => {
  const reviewData = new reviewSchema(req.body);
  try {
    reviewData.userId = req.user._id;
    reviewData.productId = req.params.pid;
    await reviewData.save();
    res.status(201).json({
      success: true,
      message: "Review added successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

const deleteReview = async (req, res) => {
  const review = await reviewSchema.findById(req.params.id);
  try {
    if (review) {
      if (req.user._id === review.userId.toString()) {
        await reviewSchema.findByIdAndDelete(req.params.id);
        res.status(202).json({
          success: true,
          message: "Review deleted succesfully",
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
        message: "Review is not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

const updateReview = async (req, res) => {
  const review = await reviewSchema.findById(req.params.id);
  try {
    if (review) {
      if (req.user._id === review.userId.toString()) {
        const updated = await reviewSchema.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );
        res.status(202).json({
          success: true,
          message: "Review updated succesfully",
          review: updated,
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
        message: "Review is not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

module.exports = { addReview, deleteReview, updateReview };
