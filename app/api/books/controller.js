const { Book, Category } = require('../../db/models');
const { Op } = require('sequelize');

module.exports = {
  getAllBooks: async (req, res, next) => {
    try {
      const { keyword = "", category = "" } = req.query;

      // Filter
      let condition = {
        user: req.user.id,
      };
      if (keyword !== "") {
        condition = { ...condition, title: { [Op.like]: `%${keyword}%` } }
      }
      if (category !== "") {
        condition = { ...condition, category }
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
  createBooks: async (req, res, next) => {
    try {
      let user = req.user.id;
      const { title, price, category, author, published, stock, image } = req.body;

      const checkCategory = await Category.findOne({
        where: {
          id: category,
          user: user,
        }
      })

      if (!checkCategory) {
        return res.status(404).json({ message: 'id category not found' });
      }

      const book = await Book.create({
        title,
        price,
        category,
        author,
        published,
        stock,
        image,
        user,
      });

      res.status(201).json({ message: 'Success create books', data: book })

    } catch (err) {
      next(err)
    }
  },
  updateBooks: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = req.user.id;
      const { title, price, category, author, published, stock, image } = req.body;

      const checkBooks = await Book.findOne({ where: { id } });

      if (!checkBooks) {
        return res.status(404).json({ message: 'Id book tidak ditemukan' })
      }

      const books = await checkBooks.update({
        title,
        price,
        category,
        author,
        published,
        stock,
        image,
        user,
      })

      res.status(201).json({ message: 'Success update book', data: books })

    } catch (err) {
      next(err)
    }
  },
  deleteBooks: (req, res, next) => {
    Book.findOne({
      where: {
        id: req.params.id,
        user: req.user.id,
      }
    }).then((books) => {
      if (books) {
        books.destroy();
        res.status(200).json({ message: 'Success delete book', data: books })
      }
    }).catch((err) => next(err))
  }
}