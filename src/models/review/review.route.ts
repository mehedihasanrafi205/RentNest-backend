import express from 'express';
import { ReviewControllers } from './review.controller';
import { auth } from '../../middlewares/auth';
import { UserRole } from '../../generated/prisma/enums';
import { validateRequest } from '../../middlewares/validateRequest';
import { ReviewValidation } from './review.validation';

const router = express.Router();

router.post(
  '/', 
  auth(UserRole.TENANT), 
  validateRequest(ReviewValidation.create),
  ReviewControllers.createReview
);
router.get('/:propertyId', ReviewControllers.getReviewsForProperty);

export const ReviewRoutes = router;
