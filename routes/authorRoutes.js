const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');

/**
 * @swagger
 * tags:
 *   name: Author
 *   description: Author management
 */

/**
 * @swagger
 * /authors:
 *   post:
 *     summary: Create a new author
 *     tags: [Author]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Author's name
 *                 example: J.K. Rowling
 *     responses:
 *       201:
 *         description: Author created
 */
router.post('/', authorController.createAuthor);

/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Get all authors
 *     tags: [Author]
 *     responses:
 *       200:
 *         description: List of authors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Author ID
 *                   name:
 *                     type: string
 *                     description: Author's name
 */
router.get('/', authorController.getAllAuthors);

/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     summary: Get author by ID
 *     tags: [Author]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Author ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Author details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Author ID
 *                 name:
 *                   type: string
 *                   description: Author's name
 */
router.get('/:id', authorController.getAuthorById);

/**
 * @swagger
 * /authors/{id}:
 *   put:
 *     summary: Update author by ID
 *     tags: [Author]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Author ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Author's new name
 *                 example: J.K. Rowling
 *     responses:
 *       200:
 *         description: Author updated
 */
router.put('/:id', authorController.updateAuthor);

/**
 * @swagger
 * /authors/{id}:
 *   delete:
 *     summary: Delete author by ID
 *     tags: [Author]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Author ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Author deleted
 */
router.delete('/:id', authorController.deleteAuthor);

module.exports = router;
