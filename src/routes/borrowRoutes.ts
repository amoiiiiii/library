import { Router } from 'express';
import { borrowBook, returnBook } from '../controllers/borrowController';

const router = Router();

router.post('/', borrowBook);
router.put('/:id/return', returnBook);

export default router;
