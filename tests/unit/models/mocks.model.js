const listAllProducts = [
  {
    id: 1,
    name: "Prancha Super Shock",
  },
  {
    id: 2,
    name: "Manto pantera Negra",
  },
];

const product = { name: "batatinha frita" };

const updateProduct = {
  id: 1,
  name: "batatinha frita",
};
// Rota sales:
const allSales = [
  {
    saleId: 1,
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 2,
  },
  {
    saleId: 1,
    date: "2021-09-09T04:54:54.000Z",
    productId: 2,
    quantity: 2,
  },
];

const getSaleId = [
  {
    productId: 1,
    quantity: 5,
    date: "2023-02-03T23:08:28.000Z",
  },
  {
    productId: 2,
    quantity: 6,
    date: "2023-02-03T23:08:28.000Z",
  },
];

const createSale = [
  {
    batainha: 1,
    quantity: 5,
  },
  {
    xablau: 2,
    quantity: 4,
  },
];

module.exports = {
  listAllProducts,
  product,
  updateProduct,
  allSales,
  getSaleId,
  createSale,
};
