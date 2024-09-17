import { Router } from 'express';
import {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
} from '../controllers/authorController';
import { isAuthenticated } from '../middleware/auth'; 
import { isAdmin } from '../middleware/isAdmin';

const router = Router();

router.post('/author', isAuthenticated, isAdmin, createAuthor);  
router.get('/author', isAuthenticated, getAllAuthors);  
router.get('/:id', isAuthenticated, getAuthorById);  
router.put('/:id', isAuthenticated, isAdmin, updateAuthor);  
router.delete('/:id', isAuthenticated, isAdmin, deleteAuthor);  

export default router;
