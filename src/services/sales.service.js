const { salesModel } = require('../models');

const getAllSales = async () => {
  const listAllSales = await salesModel.getAllSales();
  return listAllSales;
};

const getSaleById = async (id) => {
  const saleById = await salesModel.getSaleById(id);
  return saleById;
};

module.exports = {
  getAllSales,
  getSaleById,
};