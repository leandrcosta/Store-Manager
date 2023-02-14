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

const updateProduct = async ({ name, id }) => {
  await productsModel.updateProduct({ name, id }); // Informações que quero atualizar
  const updatedId = await productsModel.findProductId(id); // Verificando se o /id existe no banco
  if (!updatedId) return { type: 404, message: 'Product not found' };
  return { message: updatedId };
};

const removeProduct = async (productId) => {
  const delectedProduct = await productsModel.removeProduct(productId);
  if (delectedProduct) return { type: null, message: '' }; // Dica da aula ao vivo
};

module.exports = {
  getProductAll,
  findProductId,
  createProduct,
  updateProduct,
  removeProduct,
};