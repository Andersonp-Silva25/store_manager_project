const express = require('express');
const salesController = require('../controllers/sales.controller');
const { validateSales } = require('../middlewares/validateSales');

const salesRouter = express.Router();

salesRouter.post('/', validateSales, salesController.createSalesProducts);
salesRouter.get('/', salesController.getAllSalesProducts);
salesRouter.get('/:id', salesController.getSaleProductById);
salesRouter.delete('/:id', salesController.deleteSale);

module.exports = salesRouter;