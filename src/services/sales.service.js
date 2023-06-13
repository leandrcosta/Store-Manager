const { salesModel } = require('../models');

const getAllSales = async () => {
  const listAllSales = await salesModel.getAllSales();
  return listAllSales;
};

const getSaleById = async (id) => {
  const saleById = await salesModel.getSaleById(id);
  return saleById;
};

const createSales = async (sales) => {
  const saleId = await salesModel.createSales(sales);
  const newSaleProducts = {
    id: saleId,
    itemsSold: sales,
  };
  return newSaleProducts;
};

module.exports = {
  getAllSales,
  getSaleById,
  createSales,
};