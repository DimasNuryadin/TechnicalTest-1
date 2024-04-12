const { Transaction, DetailTransaction } = require('../../db/models');
const { Op } = require('sequelize');

module.exports = {
  getTransactionList: async (req, res, next) => {
    try {
      // Filter
      const { keyword = "" } = req.query;
      console.log("keyword >>>>")
      console.log(keyword)

      // Filter
      let condition = {
        user: req.user.id,
      };
      if (keyword !== "") {
        condition = { ...condition, invoice: { [Op.like]: `%${keyword}%` } }
      }

      const transaction = await Transaction.findAll({
        where: condition,
        include: {
          model: DetailTransaction,    // Asosiasi dengan model transaction
          as: 'detailTransaction'
        },
        attributes: { exclude: ['createdAt', 'updatedAt'] },    // created & updated tidak ditampilkan
      });
      res.status(200).json({ message: 'Success get all transaction', data: transaction })
    } catch (err) {
      next(err);
    }
  },
  detailTransactionList: async (req, res, next) => {
    try {
      const { id } = req.params;

      const detailTransaction = await Transaction.findOne({
        where: { id },
        include: {
          model: DetailTransaction,    // Asosiasi dengan model transaction
          as: 'detailTransaction'
        },
        attributes: { exclude: ['createdAt', 'updatedAt'] },    // created & updated tidak ditampilkan
      });
      res.status(200).json({ message: 'Success get all detail transaction', data: detailTransaction })
    } catch (err) {
      next(err);
    }
  }
}
