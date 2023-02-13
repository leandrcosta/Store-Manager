const { productsModel } = require('../models');

const getProductAll = async () => {
  const products = await productsModel.getAllProducts();
  return products;
};

const findProductId = async (productId) => {
  const productById = await productsModel.findProductId(productId);
  return productById;
};

const createProduct = async (name) => {
  const newProduct = await productsModel.creatProduct(name);
  return newProduct;
};

module.exports = {
  getProductAll,
  findProductId,
  createProduct,
};