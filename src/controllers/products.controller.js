const { productService } = require('../services');

const getAllProducts = async (_req, res) => {
  const product = await productService.getProductAll();
  if (product.length === undefined) res.status(404).json({ message: 'Product not found' });
  return res.status(200).json(product);
};

const findProductId = async (req, res) => {
  const { id } = req.params;
  const productById = await productService.findProductId(id);
  if (!productById) { return res.status(404).json({ message: 'Product not found' }); }
  return res.status(200).json(productById);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const newProduct = await productService.createProduct(name);
  return res.status(201).json(newProduct);
};

module.exports = {
  getAllProducts,
  findProductId,
  createProduct,
};