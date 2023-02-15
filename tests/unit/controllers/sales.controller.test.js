const chai = require("chai");
const sinonChai = require("sinon-chai");
const sinon = require("sinon");

const {
  saleList,
  addSale,
  createdSale,
} = require('./mocks.controller');
const salesService = require('../../../src/services/sales.service');
const salesController = require('../../../src/controllers/sales.controller');

chai.use(sinonChai);
const { expect } = chai;

describe("Testando a Controller", function () {
  describe("Lisstando todas as /sales/", function () {
    const req = {};
    const res = {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => {
      sinon.restore();
    });

    it("Retorna status 200 e todos as vendas cadastradas", async function () {
      sinon.stub(salesService, 'getAllSales').resolves(saleList);

      await salesController.getAllSales(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWithExactly(saleList);
    });

    it("Retorna um status 200 e a venda especifica do /id/ passado", async function () {
      req.params = { id: 1 };
      sinon.stub(salesService, 'getSaleById').resolves(saleList[0]);

      await salesController.getSaleById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWithExactly(saleList[0]);
    });
  });
});
