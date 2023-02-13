const { productsModel } = require('../models');

const getProductAll = async () => {
  const products = await productsModel.getAllProducts();
  return products;
};

const findProductId = async (productId) => {
  const productById = await productsModel.findProductId(productId);
  return productById;
};

module.exports = {
  getProductAll,
  findProductId,
};