const chai = require("chai");
const sinonChai = require("sinon-chai");
const sinon = require("sinon");

const { productsList } = require('./mocks.controller');
const productService = require('../../../src/services/products.service')
const productController = require('../../../src/controllers/products.controller');

chai.use(sinonChai);
const { expect } = chai;

describe("Testando a Controller", function () {
  describe("Lista todos os produtos cadastrados", function () {
    const req = {};
    const res = {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => {
      sinon.restore();
    });

    it("Verifica se retorna uma lista com todos os produtos e status 200", async function () {
      sinon.stub(productService, "getProductAll").resolves(productsList);

      await productController.getAllProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWithExactly(productsList);
    });
  });

  describe("Busca produto por /id/ especifico", function () {
    const req = {};
    const res = {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => {
      sinon.restore();
    });

    it("Error : Retorna um status /404/ e uma messagem:/Product not found/", async function () {
      req.params = { id: 99 };

      sinon.stub(productService, "findProductId").resolves(false);

      await productController.findProductId(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWithExactly({
        message: "Product not found",
      });
    });

    it("Quando buscado por /id/ retorna um status 200 e o produto", async function () {
      req.params = { id: 1 };

      sinon.stub(productService, "findProductId").resolves(productsList[0]);

      await productController.findProductId(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWithExactly(productsList[0]);
    });
  });
  describe("Adicionando um novo produto ao banco de dados", function () {
    it("Verifica se com os parametros corretos é possivel cadastrar novo produto", async function () {
      const res = {};
      const req = { body: { name: "Batatinha frita" } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productService, 'createProduct')
        .resolves({ id: 1, name: "Batatinha frita" });

      await productController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWithExactly({
        id: 1,
        name: "Batatinha frita",
      });
    });
  });
  describe("Removendo produtos atraves do /id/", function () {
    it("Remove um produto buscando pelo id // Se encontrado remove o produto", async function () {
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      res.end = sinon.stub().returns(res);

      sinon.stub(productService, 'removeProduct').resolves({ message: true });

      await productController.removeProduct(req, res);

      expect(res.status).to.have.been.calledWith(204);
      expect(res.json).to.have.been.not.called;
      expect(res.end).to.have.been.called;
    });
  });

  describe("Atualizando um produco cadastrado", function () {
    afterEach(sinon.restore);

    it("Retorna produto atualizado", async function () {
      const res = {};
      const req = {
        params: { id: 1 },
        body: { name: "Manto Pantera Negra" },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productService, 'updateProduct')
        .resolves({ id: 2, name: "Manto Pantera Negra" });

      await productController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
    });
  });

  describe("Testando a busca de produto por /nome/", function () {
    it("Verifica se retorna /status200/ e produtos que contem /nome da busca/", async function () {
      const res = {};
      const req = { query: { q: "feiticeira" } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      afterEach(() => {
        sinon.restore();
      });

      sinon.stub(productService, 'searchProductName').resolves([productsList[1]]);

      await productController.searchProductName(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWithExactly([productsList[1]]);
    });

    it("Verifica se retorna /status200/ e todos produtos quando /sem parametro nome/", async function () {
      const res = {};
      const req = { query: { q: "" } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'searchProductName').resolves(productsList);

      await productController.searchProductName(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWithExactly(productsList);
    });
  });
});
