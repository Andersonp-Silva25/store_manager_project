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
})