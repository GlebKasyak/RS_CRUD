const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

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
      id: Joi.objectId()
    }),
  userId: Joi.object({
    userId: Joi.objectId().required()
  }),
  login: Joi.object()
    .options({ abortEarly: false, allowUnknown: false })
    .keys({
      login: Joi.string()
        .min(4)
        .trim()
        .required(),

      password: Joi.string()
        .min(4)
        .trim()
        .required()
    })
};

module.exports = userValidationScheme;
