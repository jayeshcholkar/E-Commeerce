const userRouter = require("express").Router();
const upload = require("../middleware/imageStorage");
const user = require("../controllers/userController");
const { signupValidate, loginValidate } = require("../validation/userValidate");

userRouter.post(
  "/signup",
  upload.single("profilePic"),
  signupValidate,
  user.userSignup
);
userRouter.post("/forgetpassword", user.forgetPassword);
userRouter.post("/login", loginValidate, user.userLogin);
userRouter.post("/resetpassword/:id/:token", user.resetPassword);

module.exports = userRouter;
