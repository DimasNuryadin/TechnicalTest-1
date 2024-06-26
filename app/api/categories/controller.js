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
      res.status(201).json({ message: 'Success create categories', data: categories })
    } catch (err) {
      next(err);
    }
  },
  updateCategories: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const checkCategory = await Category.findOne({
        where: {
          id,
          user: req.user.id,
        }
      });

      const categories = await checkCategory.update({ name }, {
        where: {
          id,
          user: req.user.id,
        }
      });
      res.status(201).json({ message: 'Success update categories', data: categories })
    } catch (err) {
      next(err)
    }
  },
  deleteCategories: (req, res, next) => {
    Category.findOne({
      where: {
        id: req.params.id,
        user: req.user.id,
      }
    }).then((categories) => {
      if (categories) {
        categories.destroy();
        res.status(200).json({ message: 'Success delete categories', data: categories })
      }
    }).catch((err) => next(err));
  }
}