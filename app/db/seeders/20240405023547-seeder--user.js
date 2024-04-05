'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    // bcrypt
    const password = bcrypt.hashSync('rahasia', 10)

    await queryInterface.bulkInsert('Users',
      [
        {
          id: 1,
          name: 'John Doe',
          email: 'admin@gmail.com',
          password: password,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          name: 'Dimas',
          email: 'dimas@gmail.com',
          password: password,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('People', null, {});
  }
};
