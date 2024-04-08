const { Category } = require('../../db/models');

module.exports = {
  getAllCategories: async (req, res, next) => {
    try {
      const categories = await Category.findAll({
        where: { user: req.user.id },
        attributes: { exclude: ['createdAt', 'updatedAt'] },    // created & updated tidak ditampilkan
      });
      res.status(200).json({ message: 'Success get all categories', data: categories })
    } catch (err) {
      next(err)
    }
  },
  createCategories: async (req, res, next) => {
    try {
      const { name } = req.body;

      const categories = await Category.create({ name: name, user: req.user.id });
      res.status(201).json({ message: 'Success message categories', data: categories })
    } catch (err) {
      next(err);
    }
  }
}