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

const updateProduct = async (req, res) => {
  const { name } = req.body; // pegando o /nome enviado na requisição 
  const { id } = req.params; // Pegando o /id do produto que vai atualizar
  const { type, message } = await productService.updateProduct({ name, id });
  if (type) return res.status(404).json({ message });
  return res.status(200).json(message);
};

const removeProduct = async (req, res) => {
  const { id } = req.params;
  const removeProductId = await productService.findProductId(id); // Verificando se o /id existe;
  if (!removeProductId) return res.status(404).json({ message: 'Product not found' });

  await productService.removeProduct(id);
  return res.status(204).end();
};

const searchProductName = async (req, res) => {
  const { q } = req.query;
  const resultSearchNameProduct = await productService.searchProductName(q);
  return res.status(200).json(resultSearchNameProduct);
};

module.exports = {
  getAllProducts,
  findProductId,
  createProduct,
  updateProduct,
  removeProduct,
  searchProductName,
};