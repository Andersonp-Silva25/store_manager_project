const { expect } = require('chai');
const sinon = require('sinon');
const productService = require('../../../src/services/products.services');
const productModel = require('../../../src/models/products.model');

const { products, newProduct, id } = require('./mocks/products.service.mock');

describe('Testes unitarios do service de produtos', function () {
  afterEach(sinon.restore);

  it('Buscando todos os produtos', async function () {
    sinon.stub(productModel, 'getAll').resolves(products);
    const result = await productService.getAllProducts();

    expect(result.message).to.be.deep.equal(products);
  });

  it('Retorna um erro caso o ID do produto não exista', async function () {
    sinon.stub(productModel, 'getProductByID').resolves([]);
    const result = await productService.getProductByID(10);
    
    expect(result.type).to.equal(404);
    expect(result.message).to.equal('Product not found');
  });

  it('Retorna um produto se o ID existir', async function () {
    sinon.stub(productModel, 'getProductByID').resolves(products);
    const result = await productService.getProductByID(1);

    expect(result.type).to.equal(null);
    expect(result.message).to.be.deep.equal(products[0]);
  });

  it('Cadastrando um novo produto', async () => {
    sinon.stub(productModel, 'createProduct').resolves([{ insertId: 1 }]);
    sinon.stub(productModel, 'getProductByID').resolves(products);

    const result = await productService.createProduct('Traje do Homem de Ferro');

    expect(result.type).to.equal(null);
    expect(result.message).to.be.deep.equal(products[0]);

  });

  it('Atualiza um produto', async function () {
    const result = { type: null, message: newProduct };

    sinon.stub(productModel, 'getProductByID').resolves([newProduct]);
    sinon.stub(productModel, 'updateProduct').resolves(undefined);

    const responde = await productService.updateProduct(id, newProduct);

    expect(responde).to.be.deep.equal(result);
  });

});