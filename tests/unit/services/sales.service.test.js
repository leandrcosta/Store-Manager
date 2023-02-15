const chai = require("chai");
const sinonChai = require("sinon-chai");
const sinon = require("sinon");

const { saleMock } = require("./mocks.service");
const salesModel = require('../../../src/models/sales.model');
const salesService = require('../../../src/services/sales.service');

chai.use(sinonChai);
const { expect } = chai;

describe("Testando a camada Service", function () {
  describe("Listando todas as Sales", function () {
    afterEach(() => {
      sinon.restore();
    });

    it("Verificadno se retorna todos as sales", async function () {
      sinon.stub(salesModel, 'getAllSales').resolves(saleMock);
      const result = await salesService.getAllSales();
      expect(result).to.be.deep.equal(saleMock);
    });
  });

  describe("Listando sale relacionado ao /id/ buscado", function () {
    afterEach(() => {
      sinon.restore();
    });

    it("Verifica se retorna uma /sales/, buscando pelo id", async () => {
      sinon.stub(salesModel, 'getSaleById').resolves(saleMock[0]);

      const result = await salesService.getSaleById(1);

      expect(result).to.be.deep.equal(saleMock[0]);
    });
  });
});
