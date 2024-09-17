import { Router } from 'express';
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} from '../controllers/bookController';
import { isAuthenticated } from '../middleware/auth';
import { isAdmin } from '../middleware/isAdmin';

const router = Router();

// Rute untuk admin: hanya admin yang bisa membuat, mengubah, dan menghapus buku
router.post('/books', isAuthenticated, isAdmin, createBook);
router.put('/:id', isAuthenticated, isAdmin, updateBook);
router.delete('/:id', isAuthenticated, isAdmin, deleteBook);

// Rute untuk semua pengguna: user bisa melihat daftar buku
router.get('/books', isAuthenticated, getAllBooks);
router.get('/:id', isAuthenticated, getBookById);

export default router;
