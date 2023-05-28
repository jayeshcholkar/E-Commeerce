const userSchema = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const sendMail = require("../services/mailService");

const userSignup = async (req, res) => {
  const userData = new userSchema(req.body);
  try {
    const isUserExist = await userSchema.findOne({
      userEmail: req.body.userEmail,
    });
    if (isUserExist) {
      req.file ? fs.unlinkSync(req.file.path) : null;
      res.status(409).json({
        success: true,
        messsage: "User is already registered with this email",
      });
    } else {
      if (req.file !== undefined) {
        userData.profilePic = `${req.file.path}`;
      }
      userData.userPassword = await bcrypt.hash(req.body.userPassword, 10);
      await userData.save();
      res.status(201).json({
        success: true,
        messsage: "User registered successfully",
        data: userData,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      messsage: `Error occur ${error.message}`,
    });
  }
};

const userLogin = async (req, res) => {
  const userData = await userSchema.findOne({ userEmail: req.body.userEmail });
  try {
    if (userData) {
      const token = jwt.sign({ userData }, process.env.SECRET_KEY, {
        expiresIn: "2h",
      });
      const hashPassword = await bcrypt.compare(
        req.body.userPassword,
        userData.userPassword
      );
      if (userData && hashPassword) {
        res.status(200).json({
          success: true,
          message: "User login successfully",
          token: token,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: "User is not registered with this email",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

const forgetPassword = async (req, res) => {
  const { userEmail } = req.body;
  const userData = await userSchema.findOne({ userEmail: userEmail });
  try {
    if (userData) {
      const secretKey = process.env.SECRET_KEY + userData._id;
      const token = jwt.sign({ userData }, secretKey, { expiresIn: "5m" });
      sendMail(userData._id, userEmail, token);
      res.status(200).json({
        success: false,
        message: "Email sent successfully",
        token: token,
        userId: userData._id,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Email is not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { newPassword, confirmPassword } = req.body;
  const isUserExist = await userSchema.findById(id);
  try {
    if (isUserExist) {
      if (newPassword && confirmPassword) {
        const secretKey = process.env.SECRET_KEY + isUserExist._id;
        jwt.verify(token, secretKey);
        if (newPassword === confirmPassword) {
          const hashPassword = await bcrypt.hash(confirmPassword, 10);
          await userSchema.findOneAndUpdate(isUserExist._id, {
            $set: { userPassword: hashPassword },
          });
          res.status(202).json({
            success: true,
            message: "Password reset successfully",
          });
        } else {
          res.status(409).json({
            success: false,
            message: "New password and confirm password are not same",
          });
        }
      } else {
        res.status(400).json({
          success: false,
          message: "All fields is required",
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: "User is not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

module.exports = { userSignup, userLogin, forgetPassword, resetPassword };
