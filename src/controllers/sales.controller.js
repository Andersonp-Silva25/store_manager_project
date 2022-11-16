const saleService = require('../services/sales.services');

const createSalesProducts = async (req, res) => {
  const sales = req.body;
  
  const { type, message } = await saleService.createSalesProducts(sales);

  if (type) return res.status(type).json({ message });

  return res.status(201).json(message);
};

module.exports = {
  createSalesProducts,
};