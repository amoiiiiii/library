import { Router } from 'express';
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook
} from '../controllers/bookController';

const router = Router();

/**
 * @openapi
 * /books:
 *   post:
 *     summary: Create a new book
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the book
 *                 example: "To Kill a Mockingbird"
 *               author:
 *                 type: string
 *                 description: Author of the book
 *                 example: "Harper Lee"
 *               categoryId:
 *                 type: string
 *                 description: ID of the category
 *                 example: "1"
 *     responses:
 *       201:
 *         description: Book created successfully
 *       500:
 *         description: Internal server error
 */
router.post('/', createBook);

/**
 * @openapi
 * /books:
 *   get:
 *     summary: Get all books
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   author:
 *                     type: string
 *                   categoryId:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllBooks);

/**
 * @openapi
 * /books/{id}:
 *   get:
 *     summary: Get a single book by ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the book to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book found
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getBookById);

/**
 * @openapi
 * /books/{id}:
 *   put:
 *     summary: Update a book by ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the book to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               categoryId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       500:
 *         description: Internal server error
 */
router.put('/:id', updateBook);

/**
 * @openapi
 * /books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the book to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Book deleted successfully
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', deleteBook);

export default router;
