const express = require('express');
const router = express.Router();
const { getAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor } = require('../controllers/authorController');
/**
 * @swagger
 * tags:
 *   name: Authors
 *   description: Author management
 */

/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Get all authors
 *     tags: [Authors]
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
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: F. Scott Fitzgerald
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     summary: Get an author by ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Author found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: F. Scott Fitzgerald
 *       404:
 *         description: Author not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /authors:
 *   post:
 *     summary: Create a new author
 *     tags: [Authors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: F. Scott Fitzgerald
 *     responses:
 *       201:
 *         description: Author created successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /authors/{id}:
 *   put:
 *     summary: Update an author
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: F. Scott Fitzgerald
 *     responses:
 *       200:
 *         description: Author updated successfully
 *       404:
 *         description: Author not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /authors/{id}:
 *   delete:
 *     summary: Delete an author
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Author deleted successfully
 *       404:
 *         description: Author not found
 *       500:
 *         description: Internal server error
 */

router.get('/authors', getAuthors);
router.get('/:id', getAuthorById);
router.post('/authors', createAuthor);
router.put('/:id', updateAuthor);
router.delete('/:id', deleteAuthor);

module.exports = router;
