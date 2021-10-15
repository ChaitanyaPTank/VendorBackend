import Joi from "joi";

export const adminRegister = {
  body: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    mobile: Joi.string().required(),
    password: Joi.string().required(),
  })
};

export const adminLogin = {
  body: Joi.object({
    mobile: Joi.string().required(),
    password: Joi.string().required()
  })
};