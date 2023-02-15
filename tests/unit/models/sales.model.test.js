const chai = require("chai");
const sinonChai = require("sinon-chai");
const sinon = require("sinon");

const { allSales, getSaleId } = require('./mocks.model');
const salesService = require('../../../src/services/sales.service')
const salesController = require('../../../src/controllers/sales.controller');

chai.use(sinonChai);
const { expect } = chai;

describe("Testing the controller", function () {
  describe("List all sales", function () {
    const req = {};
    const res = {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => {
      sinon.restore();
    });

    it("Retorna status 200 e todos os produtos cadastrados", async function () {
      sinon.stub(salesService, 'getAllSales').resolves(allSales);

      await salesController.getAllSales(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWithExactly(allSales);
    });

    it("Retorna um status 200 e a venda relacionada ao /id/ buscado", async function () {
      req.params = { id: 1 };
      sinon.stub(salesService, 'getSaleById').resolves(getSaleId[0]);

      await salesController.getSaleById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWithExactly(getSaleId[0]);
    });
  });
});
