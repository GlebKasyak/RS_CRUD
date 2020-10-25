const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const taskValidationScheme = {
  newTask: Joi.object()
    .options({ abortEarly: false, allowUnknown: false })
    .keys({
      title: Joi.string()
        .min(5)
        .trim()
        .required(),

      order: Joi.number().required(),

      description: Joi.string()
        .min(5)
        .trim()
        .required(),
      userId: Joi.objectId().allow(null),
      boardId: Joi.objectId().allow(null),
      columnId: Joi.objectId().allow(null)
    }),
  updateTask: Joi.object()
    .options({ abortEarly: false, allowUnknown: false })
    .keys({
      title: Joi.string()
        .min(5)
        .trim(),

      order: Joi.number(),

      description: Joi.string()
        .min(5)
        .trim(),
      id: Joi.objectId(),
      userId: Joi.objectId().allow(null),
      boardId: Joi.objectId().allow(null),
      columnId: Joi.objectId().allow(null)
    }),
  boardId: Joi.object({
    boardId: Joi.objectId().required()
  }),
  ids: Joi.object({
    boardId: Joi.objectId().required(),
    id: Joi.objectId().required()
  })
};

module.exports = taskValidationScheme;
