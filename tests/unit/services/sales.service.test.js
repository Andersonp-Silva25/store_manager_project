const sinon = require('sinon');
const { expect } = require('chai');

const saleService = require('../../../src/services/sales.services');
const saleModel = require('../../../src/models/sales.model');
const salesMock = require('./mocks/sales.service.mock');

describe('Testes unitarios da camada Service de sales', () => {
  afterEach(function () { sinon.restore() });

  it('Testa cadastro de vendas', async () => {
    sinon.stub(saleModel, 'createSalesProducts').resolves([{ insertId: 4 }]);
    const response = await saleService.createSalesProducts([salesMock.sale]);
    expect(response.type).to.equal(null);
  });

  it('Buscando todas as vendas', async () => {
    sinon.stub(saleModel, 'getAllSalesProducts').resolves(salesMock.allSales);
    const result = await saleService.getAllSalesProducts();
    expect(result.message).to.be.deep.equal(salesMock.allSales);
  });

  it('Buscando uma venda por ID', async () => {
    sinon.stub(saleModel, 'getSaleProductById').resolves(salesMock.allSales);
    const result = await saleService.getSaleProductById(1);

    expect(result.type).to.equal(null);
    expect(result.message).to.be.deep.equal(salesMock.allSales);
  })
})