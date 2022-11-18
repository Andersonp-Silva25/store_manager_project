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

const deleteSale = async (id) => {
  const hasSale = await salesModel.getSaleProductById(id);

  if (!hasSale.length) return { type: HTTP_STATUS_NOT_FOUND, message: 'Sale not found' };

  await salesModel.deleteSale(id);

  return { type: null, message: 'Success' };
};

const updateSales = async (saleId, products) => {
  const hasSale = await productsModel.getProductByID(saleId);

  if (!hasSale.length) return { type: HTTP_STATUS_NOT_FOUND, message: 'Sale not found' };

  const productIdSales = products.map(({ productId }) => productId);
  const getAllProducts = await productsModel.getAll();
  const productIdBD = getAllProducts.map(({ id }) => id);
  const checkId = productIdSales.every((productId) => productIdBD.includes(productId));

  if (!checkId) return { type: HTTP_STATUS_NOT_FOUND, message: productNotFound };
  
  const itemsUpdated = [];
  await Promise.all(products.map(async (product) => (
    itemsUpdated.push(await salesModel.updateSales(saleId, product))
  )));

  return { type: null, message: { saleId, itemsUpdated } };
};

module.exports = {
  createSalesProducts,
  getAllSalesProducts,
  getSaleProductById,
  deleteSale,
  updateSales,
};