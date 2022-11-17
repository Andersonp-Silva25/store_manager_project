const Joi = require('joi');
const productsModel = require('../models/products.model');
const statusCode = require('../utils/statusCode');

const {
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_UNPROCESSABLE_ENTITY,
} = statusCode;

const getAllProducts = async () => {
  const allProducts = await productsModel.getAll();

  return { type: null, message: allProducts };
};

const getProductByID = async (id) => {
  const result = await productsModel.getProductByID(id);
  const [product] = result;

  if (!result.length) return { type: HTTP_STATUS_NOT_FOUND, message: 'Product not found' };

  return { type: null, message: product };
};

const createProduct = async (name) => {
  if (!name) return { type: HTTP_STATUS_BAD_REQUEST, message: '"name" is required' };
  
  const messageLength = '"name" length must be at least 5 characters long';
  const schema = Joi.string().min(5).required();
  const validateLength = schema.validate(name).error;
  
  if (validateLength) return { type: HTTP_STATUS_UNPROCESSABLE_ENTITY, message: messageLength };
  
  const newProductID = await productsModel.createProduct({ name });
  const [newProduct] = await productsModel.getProductByID(newProductID);

  return { type: null, message: newProduct };
};

const updateProduct = async (id, name) => {
  const hasProduct = await productsModel.getProductByID(id);
  if (!hasProduct.length) return { type: HTTP_STATUS_NOT_FOUND, message: 'Product not found' };

  if (!name) return { type: HTTP_STATUS_BAD_REQUEST, message: '"name" is required' };

  const messageLength = '"name" length must be at least 5 characters long';
  const schema = Joi.string().min(5).required();
  const validateLength = schema.validate(name).error;

  if (validateLength) return { type: HTTP_STATUS_UNPROCESSABLE_ENTITY, message: messageLength };

  await productsModel.updateProduct(id, name);
  const [updatedProduct] = await productsModel.getProductByID(id);
  
  return { type: null, message: updatedProduct };
};

module.exports = {
  getAllProducts,
  getProductByID,
  createProduct,
  updateProduct,
};