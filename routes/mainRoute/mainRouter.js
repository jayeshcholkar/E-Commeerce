const router = require("express").Router();
const validateToken = require("../../middleware/validateToken");
const cartRouter = require("../cartRouter");
const productRouter = require("../productRouter");
const reviewRouter = require("../reviewRouter");
const userRouter = require("../userRouter");

router.use("/user", userRouter);
router.use(validateToken);
router.use("/review", reviewRouter);
router.use("/product", productRouter);
router.use("/cart", cartRouter);

module.exports = router;
