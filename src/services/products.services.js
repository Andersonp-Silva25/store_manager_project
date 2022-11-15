const productsModel = require('../models/products.model');
const statusCode = require('../utils/statusCode');

const { HTTP_STATUS_NOT_FOUND } = statusCode;

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
  const newProductID = await productsModel.createProduct({ name });
  const [newProduct] = await productsModel.getProductByID(newProductID);

  return { type: null, message: newProduct };
};

module.exports = {
  getAllProducts,
  getProductByID,
  createProduct,
};