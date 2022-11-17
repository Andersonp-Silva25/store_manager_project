const salesModel = require('../models/sales.model');
const productsModel = require('../models/products.model');
const salesMessages = require('../utils/salesMessages');

const createSalesProducts = async (sales) => {
  const hasProductId = sales.some(({ productId }) => productId === undefined);
  const hasQuantity = sales.some(({ quantity }) => quantity === undefined);
  const checkQuantity = sales.some(({ quantity }) => quantity <= 0);

  if (hasProductId) return salesMessages.productIsRequired;
  if (hasQuantity) return salesMessages.quantityIsRequired;
  if (checkQuantity) return salesMessages.amoutGreatThanZero;

  const productIdSales = sales.map(({ productId }) => productId);
  const getAllProducts = await productsModel.getAll();
  const productIdBD = getAllProducts.map(({ id }) => id);
  const checkId = productIdSales.every((id) => productIdBD.includes(id));
  
  if (!checkId) return salesMessages.productNotFound;

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

  if (!result.length) return salesMessages.saleNotFound;

  return { type: null, message: result };
};

module.exports = {
  createSalesProducts,
  getAllSalesProducts,
  getSaleProductById,
};