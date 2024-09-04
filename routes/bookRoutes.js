const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authenticateToken = require('../middlewares/authenticateToken');

/**
 * @swagger
 * tags:
 *   name: Book
 *   description: Book management
 */

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Book]
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Book title
 *                 example: The Great Gatsby
 *               authorId:
 *                 type: integer
 *                 description: ID of the author
 *                 example: 1
 *     responses:
 *       201:
 *         description: Book created
 */
router.post('/books', authenticateToken, bookController.createBook);

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     tags: [Book]
 *     responses:
 *       200:
 *         description: List of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Book ID
 *                   title:
 *                     type: string
 *                     description: Book title
 *                   authorId:
 *                     type: integer
 *                     description: Author ID
 */
router.get('/books', bookController.getAllBooks);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get book by ID
 *     tags: [Book]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Book ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Book details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Book ID
 *                 title:
 *                   type: string
 *                   description: Book title
 *                 authorId:
 *                   type: integer
 *                   description: Author ID
 */
router.get('/:id', bookController.getBookById);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update book by ID
 *     tags: [Book]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Book ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: New book title
 *                 example: The Great Gatsby
 *               authorId:
 *                 type: integer
 *                 description: ID of the author
 *                 example: 1
 *     responses:
 *       200:
 *         description: Book updated
 */
router.put('/:id', authenticateToken, bookController.updateBook);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete book by ID
 *     tags: [Book]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Book ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Book deleted
 */
router.delete('/:id', authenticateToken, bookController.deleteBook);

module.exports = router;
