const { salesService } = require('../services'); // NÂO ESQUECER DE DESCONTRUIR

const getAllSales = async (_req, res) => {
  const allSales = await salesService.getAllSales();
  if (allSales.lenth === 0) {
    return res.status(404).json({ message: 'Nenhuma venda cadastrada' });
  }
  return res.status(200).json(allSales);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const saleById = await salesService.getSaleById(id);
  if (saleById.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  return res.status(200).json(saleById);
};

module.exports = {
  getAllSales,
  getSaleById,
};