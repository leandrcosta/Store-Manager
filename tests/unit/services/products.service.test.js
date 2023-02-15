const chai = require("chai");
const sinonChai = require("sinon-chai");
const sinon = require("sinon");

const { products, createProducId } = require('./mocks.service');
const productModel = require('../../../src/models/products.model');
const productService = require('../../../src/services/products.service');

chai.use(sinonChai);
const { expect } = chai;

describe("Testando a camada de Service", function () {
  describe("Listando todos os products", function () {
    afterEach(() => {
      sinon.restore();
    });

    it("Verificando se retorna todos os produtos", async function () {
      sinon.stub(productModel, 'getAllProducts').resolves(products);
      const result = await productService.getProductAll();
      expect(result).to.be.deep.equal(products);
    });
  });

  describe("Verifica se quando buscado por /id/ retorna o objeto do id especifico", function () {
    afterEach(() => {
      sinon.restore();
    });

    it("Verifica se retorna um produto, buscando pelo id", async () => {
      sinon.stub(productModel, 'findProductId').resolves(products[0]);
      const result = await productService.findProductId(1);
      expect(result).to.be.deep.equal(products[0]);
    });
  });

  describe("Criando um novo produto", function () {
    afterEach(() => {
      sinon.restore();
    });

    it("Verificando se é possivel criar um novo produto", async () => {
      sinon.stub(productModel, 'creatProduct').resolves(createProducId);
      const result = await productService.createProduct(createProducId);
      expect(result).to.be.deep.equal(createProducId);
    });
  });

  describe("Atualizando um produto", function () {
    afterEach(() => {
      sinon.restore();
    });

    it("Verifica se é possivel atualizar um  produto que ja existe", async () => {
      const id = 1;
      const updated = { id: 5, ...createProducId };

      sinon.stub(productModel, 'findProductId').resolves(updated);
      sinon.stub(productModel, 'updateProduct').resolves(updated);

      const result = await productService.updateProduct(updated, id);

      expect(result.message).to.be.deep.equal(updated);
    });
  });

  describe("Removendo um produto", function () {
    afterEach(() => {
      sinon.restore();
    });

    it("Verifica se é possivel remover um produco", async () => {
      const deleted = 1;

      sinon.stub(productModel, 'findProductId').resolves({});
      sinon.stub(productModel, 'removeProduct').resolves({});

      const result = await productService.removeProduct(deleted);

      expect(result.message).to.be.deep.equal('');
    });
  });
});
