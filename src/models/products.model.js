const connection = require('./connection');
// Buscar todos os produtos
const getAllProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};

// Buscar por ID especifico
const findProductId = async (productId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE  id = ?',
    [productId],
  );
  return result;
};

module.exports = {
  getAllProducts,
  findProductId,
};