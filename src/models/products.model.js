const connection = require('./connection');
// Buscar todos os produtos
const getAllProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};

const findProductId = async (productId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE  id = ?',
    [productId],
  );
  return result;
};

const creatProduct = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products(name) VALUE (?)', [name],
);
  const newProduct = {
    id: insertId,
    name,
  };
  return newProduct;
};

const updateProduct = async ({ name, id }) => {
  const [result] = await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id= ? ',
    [name, id],
  );
  return result;
};

const removeProduct = async (id) => {
  const delectedProduct = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ? ',
    [id],
  );
  return delectedProduct;
};

module.exports = {
  getAllProducts,
  findProductId,
  creatProduct,
  updateProduct,
  removeProduct,
};