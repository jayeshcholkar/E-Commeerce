const userSchema = require("../validation/userSchema");

module.exports = {
  signupValidate: async (req, res, next) => {
    const value = userSchema.userSignup.validate(req.body, {
      abortEarly: true,
    });
    if (value.error) {
      res.status(400).json({
        success: false,
        message: `Error occur ${value.error.details[0].message}`,
      });
    } else {
      next();
    }
  },
  loginValidate: async (req, res, next) => {
    const value = userSchema.userLogin.validate(req.body, {
      abortEarly: true,
    });
    if (value.error) {
      res.status(400).json({
        success: false,
        message: `Error occur ${value.error.details[0].message}`,
      });
    } else {
      next();
    }
  },
};
