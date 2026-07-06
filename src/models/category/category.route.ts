import express from 'express';
import { CategoryControllers } from './category.controller';
import auth from '../../middlewares/auth';
import { UserRole } from '../../generated/prisma/client';

const router = express.Router();

router.post('/', auth(UserRole.ADMIN), CategoryControllers.createCategory);
router.get('/', CategoryControllers.getAllCategories);
router.patch('/:id', auth(UserRole.ADMIN), CategoryControllers.updateCategory);
router.delete('/:id', auth(UserRole.ADMIN), CategoryControllers.deleteCategory);

export const CategoryRoutes = router;
