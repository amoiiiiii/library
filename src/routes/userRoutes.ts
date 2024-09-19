import { Router } from 'express';
import {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/userController';

const router = Router();

/**
 * @openapi
 * /register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/register', registerUser);

/**
 * @openapi
 * /login:
 *   post:
 *     summary: Login a user and return a token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token returned successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/login', loginUser);

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get all users
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   username:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
router.get('/users', getAllUsers);

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/users/:id', getUserById);

/**
 * @openapi
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       500:
 *         description: Internal server error
 */
router.put('/users/:id', updateUser);

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       500:
 *         description: Internal server error
 */
router.delete('/users/:id', deleteUser);

export default router;
