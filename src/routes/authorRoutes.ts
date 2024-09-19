import { Router } from 'express';
import {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor
} from '../controllers/authorController';

const router = Router();

/**
 * @openapi
 * /authors:
 *   post:
 *     summary: Create a new author
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the author
 *                 example: "John Doe"
 *     responses:
 *       201:
 *         description: Author created successfully
 *       500:
 *         description: Internal server error
 */
router.post('/', createAuthor);

/**
 * @openapi
 * /authors:
 *   get:
 *     summary: Get all authors
 *     responses:
 *       200:
 *         description: List of all authors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllAuthors);

/**
 * @openapi
 * /authors/{id}:
 *   get:
 *     summary: Get a single author by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the author to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Author found
 *       404:
 *         description: Author not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getAuthorById);

/**
 * @openapi
 * /authors/{id}:
 *   put:
 *     summary: Update an author by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the author to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: New name of the author
 *                 example: "Jane Doe"
 *     responses:
 *       200:
 *         description: Author updated successfully
 *       500:
 *         description: Internal server error
 */
router.put('/:id', updateAuthor);

/**
 * @openapi
 * /authors/{id}:
 *   delete:
 *     summary: Delete an author by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the author to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Author deleted successfully
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', deleteAuthor);

export default router;
