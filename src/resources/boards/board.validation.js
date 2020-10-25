const Joi = require('joi');

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
    boardId: Joi.string().required()
  })
};

module.exports = boardValidationScheme;
