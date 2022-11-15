const productsService = require('../services/products.services');
const statusCode = require('../utils/statusCode');

const { HTTP_STATUS_OK } = statusCode;

const getAllProducts = async (_req, res) => {
  const { message } = await productsService.getAllProducts(); 

  return res.status(HTTP_STATUS_OK).json(message);
};

const getProductByID = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.getProductByID(id);

  if (type) return res.status(type).json({ message });

  return res.status(HTTP_STATUS_OK).json(message);
};

module.exports = {
  getAllProducts,
  getProductByID,
};