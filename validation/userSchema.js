const joi = require("joi");

const userSchema = { 
  userSignup :  joi
  .object({
    userName: joi.string().min(6).max(20).required(),
    userPassword: joi
      .string()
      .pattern(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/))
      .min(6)
      .max(20)
      .required().trim(),
    userEmail: joi
      .string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required().trim(),
    userState: joi.string().required(),
    userCity: joi.string().required(),
    userPhone: joi.number().required().min(0000000000).max(9999999999),
  })
  .unknown(true),
  userLogin : joi.object({
    userPassword: joi
    .string()
    .min(6)
    .max(20)
    .required().trim(),
  userEmail: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required().trim(),
  })
}

module.exports = userSchema;
