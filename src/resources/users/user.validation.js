const Joi = require('joi');

const userValidationScheme = {
  newUser: Joi.object()
    .options({ abortEarly: false, allowUnknown: false })
    .keys({
      name: Joi.string()
        .min(4)
        .trim()
        .required(),

      login: Joi.string()
        .min(4)
        .trim()
        .required(),

      password: Joi.string()
        .min(4)
        .trim()
        .required()
    }),
  updateUser: Joi.object()
    .options({ abortEarly: false, allowUnknown: false })
    .keys({
      name: Joi.string()
        .min(4)
        .trim(),

      login: Joi.string()
        .min(4)
        .trim(),

      password: Joi.string()
        .min(4)
        .trim(),
      id: Joi.string()
    }),
  userId: Joi.object({
    userId: Joi.string().required()
  })
};

module.exports = userValidationScheme;
