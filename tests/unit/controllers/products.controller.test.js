const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai)

const productService = require('../../../src/services/products.services');
const productsController = require('../../../src/controllers/products.controller');

const { products } = require('./mocks/products.controller.mock');

describe('Testes unitarios do controller de produtos', function () {
  afterEach(sinon.restore);

  it('Buscando todos os produtos', async function () {
    const res = {};
    const req = {};
    const allProducts = products;

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productService, 'getAllProducts')
      .resolves({ type: null, message: allProducts });
    
    await productsController.getAllProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProducts);
  });

  it('Buscando produtos por ID', async function () {
    const res = {};
    const req = {
      params: { id: 1 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productService, 'getProductByID')
      .resolves({ type: null, message: products[0] });

    await productsController.getProductByID(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products[0]);
  });

  it('Retorna um erro caso o ID não seja encontrado', async function () {
    const res = {};
    const req = {
      params: { id: 15 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productService, 'getProductByID')
      .resolves({ type: 404, message: 'Product not found' });

    await productsController.getProductByID(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

});