import { Router } from 'express';
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController';
import { isAuthenticated } from '../middleware/auth'; 
import { isAdmin } from '../middleware/isAdmin';

const router = Router();

router.post('/categories',isAuthenticated, isAdmin,  createCategory);
router.get('/categorie',isAuthenticated, isAdmin,  getAllCategories);
router.get('/:id',isAuthenticated, isAdmin,  getCategoryById);
router.put('/:id',isAuthenticated, isAdmin,  updateCategory);
router.delete('/:id',isAuthenticated, isAdmin,  deleteCategory);

export default router;
