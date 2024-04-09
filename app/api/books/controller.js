const { Book, Category } = require('../../db/models');
const { Op } = require('sequelize');

module.exports = {
  getAllBooks: async (req, res, next) => {
    try {
      const { keyword = "" } = req.query;

      // Filter
      let condition = {
        user: req.user.id,
      };
      if (keyword !== "") {
        condition = { ...condition, title: { [Op.like]: `%${keyword}%` } }
      }

      const books = await Book.findAll({
        where: condition,
        include: {
          model: Category,    // Asosiasi dengan model category
          attributes: ['id', 'name']  // Hanya menampilkan id dan name
        },
        attributes: { exclude: ['createdAt', 'updatedAt'] },    // created & updated tidak ditampilkan
      });
      res.status(200).json({ message: 'Success get all books', data: books })
    } catch (err) {
      next(err)
    }
  },
}