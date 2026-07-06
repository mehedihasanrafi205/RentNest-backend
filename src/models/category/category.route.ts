import express from 'express';
import { CategoryControllers } from './category.controller';
import { auth } from '../../middlewares/auth';
import { UserRole } from '../../generated/prisma/enums';
import { validateRequest } from '../../middlewares/validateRequest';
import { CategoryValidation } from './category.validation';

const router = express.Router();

router.post(
  '/', 
  auth(UserRole.ADMIN), 
  validateRequest(CategoryValidation.create),
  CategoryControllers.createCategory
);
router.get('/', CategoryControllers.getAllCategories);
router.patch('/:id', auth(UserRole.ADMIN), CategoryControllers.updateCategory);
router.delete('/:id', auth(UserRole.ADMIN), CategoryControllers.deleteCategory);

export const CategoryRoutes = router;
