const express = require('express');
const productsController = require('../controllers/products.controller');
const { validateName } = require('../middlewares/validateProduct');

const productsRouter = express.Router();

productsRouter.get('/search', productsController.getProductByName);
productsRouter.get('/', productsController.getAllProducts);
productsRouter.get('/:id', productsController.getProductByID);
productsRouter.post('/', validateName, productsController.createProduct);
productsRouter.put('/:id', validateName, productsController.updateProduct);
productsRouter.delete('/:id', productsController.deleteProduct);

module.exports = productsRouter;