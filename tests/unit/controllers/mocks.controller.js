const productsList = [
  {
    id: 1,
    name: "Capitão America",
  },
  {
    id: 2,
    name: "Feiticeira Escarlate",
  },
  {
    id: 3,
    name: "Bob Esponja",
  },
];

const createNewProduct = { name: "Capitão planeta" };
// Rota sales
const saleList = [
  {
    saleId: 1,
    date: "2023-01-25T18:24:47.000Z",
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: "2023-01-25T18:24:47.000Z",
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: "2023-01-25T18:24:47.000Z",
    productId: 3,
    quantity: 15,
  },
];

const addSale = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const createdSale = {
  id: 1,
  itemsSold: [
    {
      productId: 5,
      quantity: 10,
    },
    {
      productId: 2,
      quantity: 4,
    },
  ],
};

module.exports = {
  productsList,
  createNewProduct,
  saleList,
  addSale,
  createdSale,
};
