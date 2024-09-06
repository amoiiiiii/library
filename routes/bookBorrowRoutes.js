const express = require('express');
const router = express.Router();
const borrowController = require('../controllers/bookBorrowController');
const authenticateToken = require('../middlewares/authenticateToken');

/**
 * @swagger
 * tags:
 *   name: Borrow
 *   description: Book borrowing management
 */

/**
 * @swagger
 * /borrow:
 *   post:
 *     summary: Borrow a book
 *     tags: [Borrow]
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookId:
 *                 type: integer
 *                 description: ID of the book to borrow
 *                 example: 1
 *               userId:
 *                 type: integer
 *                 description: ID of the user borrowing the book
 *                 example: 123
 *     responses:
 *       201:
 *         description: Book borrowed
 */
router.post('/', authenticateToken, borrowController.borrowBook);

/**
 * @swagger
 * /borrow/return/{id}:
 *   put:
 *     summary: Return a borrowed book
 *     tags: [Borrow]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the borrowed book
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Book returned
 */
router.put('/return/:id', authenticateToken, borrowController.returnBook);

module.exports = router;
