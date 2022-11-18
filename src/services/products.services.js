const productsModel = require('../models/products.model');
const statusCode = require('../utils/statusCode');

const {
  HTTP_STATUS_NOT_FOUND,
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
  const newProductID = await productsModel.createProduct({ name });
  const [newProduct] = await productsModel.getProductByID(newProductID);
  
  return { type: null, message: newProduct };
};

const updateProduct = async (id, name) => {
  const hasProduct = await productsModel.getProductByID(id);
  
  if (!hasProduct.length) return { type: HTTP_STATUS_NOT_FOUND, message: 'Product not found' };
  
  await productsModel.updateProduct(id, name);
  
  const [updatedProduct] = await productsModel.getProductByID(id);
  
  return { type: null, message: updatedProduct };
};

const deleteProduct = async (id) => {
  const hasProduct = await productsModel.getProductByID(id);

  if (!hasProduct.length) return { type: HTTP_STATUS_NOT_FOUND, message: 'Product not found' };

  await productsModel.deleteProduct(id);

  return { type: null, message: 'Success' };
};

module.exports = {
  getAllProducts,
  getProductByID,
  createProduct,
  updateProduct,
  deleteProduct,
};