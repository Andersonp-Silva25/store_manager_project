const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const saleController = require('../../../src/controllers/sales.controller');
const saleService = require('../../../src/services/sales.services');
const saleMock = require('./mocks/sales.controller.mock');

describe('Testes unitarios da camada Controller de sales', () => {
  afterEach(() => sinon.restore());

  it('Testa o cadastro de vendas', async () => {
    const res = {};
    const req = { body: saleMock.sale };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(saleService, 'createSalesProducts')
      .resolves({ type: null, message: { id: 1, itemsSold: saleMock.sale } });
    
    await saleController.createSalesProducts(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith({ id: 1, itemsSold: saleMock.sale });
  });

  it('Testa o cadastro de vendas sem sucesso', async () => {
    const res = {};
    const req = { body: saleMock.sale };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(saleService, 'createSalesProducts')
      .resolves({ type: 404, message: 'Product not found' });

    await saleController.createSalesProducts(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('Buscando todas as vendas', async () => {
    const res = {};
    const req = {};
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(saleService, 'getAllSalesProducts')
      .resolves({ type: null, message: saleMock.allSales });
    
    await saleController.getAllSalesProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(saleMock.allSales);
  });

  it('Buscando vendas por ID', async function () {
    const res = {};
    const req = {
      params: { id: 1 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(saleService, 'getSaleProductById')
      .resolves({ type: null, message: saleMock.allSales[0] });

    await saleController.getSaleProductById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(saleMock.allSales[0]);
  });
});