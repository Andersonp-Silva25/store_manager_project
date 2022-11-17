const express = require('express');
const salesController = require('../controllers/sales.controller');

const salesRouter = express.Router();

salesRouter.post('/', salesController.createSalesProducts);
salesRouter.get('/', salesController.getAllSalesProducts);
salesRouter.get('/:id', salesController.getSaleProductById);

module.exports = salesRouter;