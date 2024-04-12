const { Transaction, DetailTransaction } = require('../../db/models');

module.exports = {
  getTransactionList: async (req, res, next) => {
    try {
      // Filter
      const { invoice = "" } = req.query;

      // Filter
      let condition = {
        user: req.user.id,
      };
      if (invoice !== "") {
        condition = { ...condition, invoice: { [Op.like]: `%${invoice}%` } }
      }

      const transaction = await Transaction.findAll({
        where: condition,
        include: {
          model: DetailTransaction,    // Asosiasi dengan model transaction
          as: 'detailTransaction'
        },
        attributes: { exclude: ['createdAt', 'updatedAt'] },    // created & updated tidak ditampilkan
      });
      res.status(200).json({ message: 'Success get all books', data: transaction })
    } catch (err) {
      next(err);
    }
  }
}
