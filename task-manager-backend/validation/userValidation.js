import Joi from "joi";

const userSignupSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.base": "Password should be a string",
    "string.min": "Password should be at least 6 characters long",
    "any.required": "Password is required",
  }),
  role: Joi.string().valid("user", "admin").default("user").messages({
    "any.only": 'Role should be either "user" or "admin"',
  }),
});

const userLoginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.base": "Password should be a string",
    "string.min": "Password should be at least 6 characters long",
    "any.required": "Password is required",
  }),
});

export { userSignupSchema, userLoginSchema };
