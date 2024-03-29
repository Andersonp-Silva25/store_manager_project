const saleService = require('../services/sales.services');
const statusCode = require('../utils/statusCode');

const { HTTP_STATUS_OK, HTTP_STATUS_CREATED, HTTP_STATUS_NO_CONTENT } = statusCode;

const createSalesProducts = async (req, res) => {
  const sales = req.body;
  
  const { type, message } = await saleService.createSalesProducts(sales);

  if (type) return res.status(type).json({ message });

  return res.status(HTTP_STATUS_CREATED).json(message);
};

const getAllSalesProducts = async (_req, res) => {
  const { message } = await saleService.getAllSalesProducts();

  return res.status(HTTP_STATUS_OK).json(message);
};

const getSaleProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleService.getSaleProductById(id);

  if (type) return res.status(type).json({ message });

  return res.status(HTTP_STATUS_OK).json(message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await saleService.deleteSale(id);

  if (type) return res.status(type).json({ message });

  return res.status(HTTP_STATUS_NO_CONTENT).json();
};

const updateSales = async (req, res) => {
  const products = req.body;
  const { id } = req.params;
  const { type, message } = await saleService.updateSales(id, products);

  if (type) return res.status(type).json({ message });

  return res.status(HTTP_STATUS_OK).json(message);
};

module.exports = {
  createSalesProducts,
  getAllSalesProducts,
  getSaleProductById,
  deleteSale,
  updateSales,
};