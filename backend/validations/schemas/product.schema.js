import Joi from "joi";
export const productSchemaValidation = {

  //create
  create: Joi.object({
    name: Joi.string().required().min(2).max(100).messages({
      "string.empty": "Product name is required",
      "string.min": "Product name must be at least {#limit} characters",
      "string.max": "Product name cannot exceed {#limit} characters",
    }),

    price: Joi.number().required().positive().messages({
      "number.base": "Price must be a number",
      "number.positive": "Price must be positive",
    }),

    category: Joi.string().required().messages({
      "string.empty": "Category is required",
    }),

    description: Joi.string().max(500).messages({
      "string.max": "Description cannot exceed {#limit} characters",
    }),
  }),


    //update
    update: Joi.object({
      name: Joi.string().min(2).max(100).messages({
        "string.min": "Product name must be at least {#limit} characters",
        "string.max": "Product name cannot exceed {#limit} characters",
      }),
  
      price: Joi.number().positive().messages({
        "number.base": "Price must be a number",
        "number.positive": "Price must be positive",
      }),
  
      category: Joi.string(),
  
      description: Joi.string().max(500).messages({
        "string.max": "Description cannot exceed {#limit} characters",
      }),
    }),
    

};
