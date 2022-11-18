const Joi = require('joi');
const statusCode = require('../utils/statusCode');

const {
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_UNPROCESSABLE_ENTITY,
} = statusCode;

const validateName = (req, res, next) => {
  const { name } = req.body;
  
  if (!name) return res.status(HTTP_STATUS_BAD_REQUEST).json({ message: '"name" is required' });

  const messageLength = { message: '"name" length must be at least 5 characters long' };
  const schema = Joi.string().min(5).required();
  const validateLength = schema.validate(name).error;

  if (validateLength) return res.status(HTTP_STATUS_UNPROCESSABLE_ENTITY).json(messageLength);

  return next();
};

module.exports = {
  validateName,
};