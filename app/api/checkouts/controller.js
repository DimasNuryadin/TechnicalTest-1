const { Transaction, DetailTransaction, Book } = require("../../db/models");
const { Op } = require('sequelize');
const { sequelize } = require('../../db/models');

module.exports = {
  checkout: async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
      const { payload } = req.body;
      const user = req.user.id;

      const transaction = await Transaction.create({
        invoice: `T-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date(),
        user,
      }, { transaction: t })

      // Check book
      let errorBookIdNotFound = [],
        errorBookIdStock = [],
        updateStock = [];

      for (let i of payload) {        // let i = 0; i < payload.length; i++
        const checkingBook = await Book.findOne({
          where: {
            id: i.bookId, user,
          }
        });

        // Add field create detail transaction
        i.transaction = transaction.id;
        i.titleBook = checkingBook?.title;
        i.book = checkingBook.id;
        i.imageBook = checkingBook?.image;
        i.priceBook = checkingBook?.price;
        i.user = user;

        updateStock.push({
          id: i.bookId,
          stock: checkingBook?.stock - i.quantity,
        })

        if (i?.quantity > checkingBook?.stock) {
          errorBookIdStock.push(`${i?.quantity} - ${checkingBook?.stock}`)
        }

        if (!checkingBook) {
          errorBookIdNotFound.push(i?.bookId)
        }
      }

      if (errorBookIdStock.length !== 0) {
        return res.status(400).json({
          message: `Book stock is not enough with id = ${errorBookIdStock.join(', ')} and user : ${user}`
        })
      }
      if (errorBookIdNotFound.length !== 0) {
        return res.status(400).json({
          message: `No book with id : ${errorBookIdNotFound.join(', ')} and user : ${user} `
        })
      }

      console.log("update stock : ", updateStock)
      console.log("payload : ", payload)

      // Jika success
      await Book.bulkCreate(updateStock, {
        updateOnDuplicate: ['stock'],
      }, { transaction: t })

      const detailTransaction = await DetailTransaction.bulkCreate(payload, {
        transaction: t,
      });
      await t.commit();

      res.status(201).json({ message: 'Success checkout', data: detailTransaction })

    } catch (err) {
      if (t) await t.rollback();     // Jika tambah data transaction error maka data detailTransaction jangan di tambah
      next(err)
    }
  }
}
