const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../src/models/db/connection');
const salesModel = require('../../../src/models/sales.model');
const salesMock = require('./mocks/sales.model.mock');

describe('Testes unitarios da camada Model de sales', () => {
  afterEach(function () { sinon.restore() });

  it('Testa se é gerado um id para cadastro de vendas', async () => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 2 }]);
    const response = await salesModel.createSales(salesMock.sale);
    expect(response).to.be.deep.equal(2);
  });
  
  it('Testa cadastro de vendas', async () => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    const response = await salesModel.createSalesProducts(salesMock.sale);
    expect(response).to.be.deep.equal(1);
  });

  it('Buscando todas as vendas', async () => {
    sinon.stub(connection, 'execute').resolves([salesMock.allSales]);
    const result = await salesModel.getAllSalesProducts();
    expect(result).to.be.deep.equal(salesMock.allSales);
  });

  it('Buscando uma venda pelo seu ID', async function () {
    sinon.stub(connection, 'execute').resolves([salesMock.allSales[0]]);
    const result = await salesModel.getSaleProductById(1)
    expect(result).to.be.deep.equal(salesMock.allSales[0]);
  });
});