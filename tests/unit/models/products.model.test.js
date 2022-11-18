const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/products.model');

const connection = require('../../../src/models/db/connection');

const { products, newProduct } = require('./mocks/products.model.mock');

describe('Testes unitarios do model de produtos', function () {
  afterEach(sinon.restore);

  it('Buscando todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([products]);
    const result = await productsModel.getAll();
    expect(result).to.be.deep.equal(products);
  });

  it('Buscando um produto pelo seu ID', async function () {
    sinon.stub(connection, 'execute').resolves([[products[0]]]);
    const result = await productsModel.getProductByID(1);
    expect(result).to.be.deep.equal([products[0]]);
  });

  it('Cadastrando um produto', async () => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
    const result = await productsModel.createProduct(newProduct);
    expect(result).to.equal(4);
  });
});