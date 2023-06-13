const camelize = require('camelize');
const connection = require('./connection');

const getAllSales = async () => {
  const [listAllSales] = await connection.execute(
    `SELECT SP.sale_id, S.date, SP.product_id, SP.quantity
    FROM StoreManager.sales_products AS SP
    INNER JOIN StoreManager.sales AS S
    ON SP.sale_id = S.id
    ORDER BY SP.sale_id ASC, SP.product_id ASC;`,
  );

  return camelize(listAllSales);
};

const getSaleById = async (id) => {
  const [saleId] = await connection.execute(
    `SELECT SP.product_id, SP.quantity, S.date
      FROM StoreManager.sales_products AS SP
      INNER JOIN StoreManager.sales AS S
      ON SP.sale_id = S.id
      WHERE SP.sale_id = ?
      ORDER BY SP.sale_id, SP.product_id`,
    [id],
  );
  return camelize(saleId);
};

const createSales = async (arrayProducts) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (NOW())',
  );
  const products = arrayProducts
    .map(
      ({ productId, quantity }) => `(${insertId}, ${productId}, ${quantity})`,
    )
    .join(', ');
  await connection.execute(
    `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) 
    VALUE ${products}`,
  );
  console.log(insertId);
  return insertId;
};

module.exports = {
  getAllSales,
  getSaleById,
  createSales,
};
