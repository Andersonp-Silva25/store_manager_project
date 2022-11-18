const salesModel = require('../models/sales.model');
const productsModel = require('../models/products.model');
const statusCode = require('../utils/statusCode');
const { productNotFound, saleNotFound } = require('../utils/salesMessages');

const {
  HTTP_STATUS_NOT_FOUND,
} = statusCode;

const createSalesProducts = async (sales) => {
  const productIdSales = sales.map(({ productId }) => productId);
  const getAllProducts = await productsModel.getAll();
  const productIdBD = getAllProducts.map(({ id }) => id);
  const checkId = productIdSales.every((id) => productIdBD.includes(id));
  
  if (!checkId) return { type: HTTP_STATUS_NOT_FOUND, message: productNotFound };

  const saleId = await salesModel.createSales();
  await Promise.all(sales.map(async (sale) => salesModel.createSalesProducts({ saleId, ...sale })));

  return { type: null, message: { id: saleId, itemsSold: sales } };
};

const getAllSalesProducts = async () => {
  const allSales = await salesModel.getAllSalesProducts();

  return { type: null, message: allSales };
};

const getSaleProductById = async (id) => {
  const result = await salesModel.getSaleProductById(id);

  if (!result.length) return { type: HTTP_STATUS_NOT_FOUND, message: saleNotFound };

  return { type: null, message: result };
};

module.exports = {
  createSalesProducts,
  getAllSalesProducts,
  getSaleProductById,
};