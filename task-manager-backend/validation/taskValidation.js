import Joi from "joi";

const taskSchema = Joi.object({
  title: Joi.string().min(3).max(100).required().messages({
    "string.base": "Title should be a string",
    "string.empty": "Title cannot be empty",
    "string.min": "Title should be at least 3 characters long",
    "string.max": "Title should be less than 100 characters",
    "any.required": "Title is required",
  }),
  description: Joi.string().min(3).max(500).required().messages({
    "string.base": "Description should be a string",
    "string.empty": "Description cannot be empty",
    "string.min": "Description should be at least 3 characters long",
    "string.max": "Description should be less than 500 characters",
    "any.required": "Description is required",
  }),
  status: Joi.string()
    .valid("Pending", "Completed")
    .default("Pending")
    .messages({
      "any.only": 'Status should be either "Pending" or "Completed"',
    }),
});

export default taskSchema;
