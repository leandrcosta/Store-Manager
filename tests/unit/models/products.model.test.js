const chai = require("chai");
const { expect } = chai;
const sinon = require("sinon");

const productModel = require('../../../src/models/products.model');
const { listAllProducts, product, updateProduct } = require('./mocks.model');
const connection = require("../../../src/models/connection");

describe("Testando a Model ", function () {
  it("Lista todos os produtos registrados no banco", async function () {
    afterEach(() => {
      sinon.restore();
    });

    sinon.stub(connection, "execute").resolves([listAllProducts]);

    const result = await productModel.getAllProducts();

    expect(result).to.been.deep.equal(listAllProducts);
  });

  it("Lista produtos buscando por id", async function () {
    afterEach(() => {
      sinon.restore();
    });

    sinon.stub(connection, "execute").resolves([[listAllProducts[0]]]);

    const result = await productModel.findProductId(1);

    expect(result).to.be.deep.equal(listAllProducts[0]);
  });

  it("Remove produto de /id/ especifico", async function () {
    sinon.stub(connection, "execute").resolves(true);

    const result = await productModel.removeProduct(1);

    expect(result).to.be.deep.equal(true);
  });

  describe("Atualizando um porduto", function () {
    it("Retorna o produto atualizado", async function () {
      sinon.stub(connection, "execute").resolves([updateProduct]);

      const result = await productModel.updateProduct(1, product);

      expect(result).to.be.deep.equal(updateProduct);
    });
  });
  describe("Buscando pelo nome do produto", function () {
    afterEach(() => {
      sinon.restore();
    });

    it("Retorna a lista que contem /nome/ produto", async function () {
      sinon.stub(connection, "execute").resolves([listAllProducts[1]]);

      const search = await productModel.searchProductName("shock");

      expect(search).to.be.deep.equal(listAllProducts[1]);
    });

    it("Verifica se retorna /status200/ e todos produtos quando /sem parametro nome/", async function () {
      sinon.stub(connection, "execute").resolves([listAllProducts]);

      const search = await productModel.searchProductName("");

      expect(search).to.be.deep.equal(listAllProducts);
    });
  });
});
