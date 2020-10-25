const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const boardValidationScheme = {
  newBoard: Joi.object()
    .options({ abortEarly: false, allowUnknown: false })
    .keys({
      title: Joi.string()
        .min(5)
        .trim()
        .required(),

      columns: Joi.array().items(
        Joi.object().keys({
          title: Joi.string().trim(),
          order: Joi.number()
        })
      )
    }),
  boardId: Joi.object({
    boardId: Joi.objectId().required()
  })
};

module.exports = boardValidationScheme;
