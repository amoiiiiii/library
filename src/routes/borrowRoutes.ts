import { Router } from 'express';
import {
  createBorrow,
  getAllBorrows,
  getBorrowById,
  updateBorrow,
  deleteBorrow,
  returnBorrow,
} from '../controllers/borrowController';

const router = Router();

/**
 * @openapi
 * /borrows:
 *   post:
 *     summary: Create a new borrow record
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookId:
 *                 type: string
 *                 description: ID of the book being borrowed
 *                 example: "1"
 *               userId:
 *                 type: string
 *                 description: ID of the user borrowing the book
 *                 example: "1"
 *               borrowDate:
 *                 type: string
 *                 format: date
 *                 description: Date of borrowing
 *                 example: "2024-09-15"
 *               returnDate:
 *                 type: string
 *                 format: date
 *                 description: Expected return date
 *                 example: "2024-10-15"
 *     responses:
 *       201:
 *         description: Borrow record created successfully
 *       500:
 *         description: Internal server error
 */
router.post('/', createBorrow);

/**
 * @openapi
 * /borrows:
 *   get:
 *     summary: Get all borrow records
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all borrow records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   bookId:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   borrowDate:
 *                     type: string
 *                     format: date
 *                   returnDate:
 *                     type: string
 *                     format: date
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllBorrows);

/**
 * @openapi
 * /borrows/{id}:
 *   get:
 *     summary: Get a single borrow record by ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the borrow record to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Borrow record found
 *       404:
 *         description: Borrow record not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getBorrowById);

/**
 * @openapi
 * /borrows/{id}:
 *   put:
 *     summary: Update a borrow record by ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the borrow record to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookId:
 *                 type: string
 *               userId:
 *                 type: string
 *               borrowDate:
 *                 type: string
 *                 format: date
 *               returnDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Borrow record updated successfully
 *       500:
 *         description: Internal server error
 */
router.put('/:id', updateBorrow);

/**
 * @openapi
 * /borrows/{id}:
 *   delete:
 *     summary: Delete a borrow record by ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the borrow record to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Borrow record deleted successfully
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', deleteBorrow);

/**
 * @openapi
 * /borrows/{id}/return:
 *   post:
 *     summary: Return a borrowed book and update the book quantity
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the borrow record to return
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book returned and quantity updated successfully
 *       404:
 *         description: Borrow record not found
 *       500:
 *         description: Internal server error
 */  
router.post('/:id/return', returnBorrow);

export default router;
