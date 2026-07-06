import express from 'express';
import { ReviewControllers } from './review.controller';
import { auth } from '../../middlewares/auth';
import { UserRole } from '../../generated/prisma/client';

const router = express.Router();

router.post('/', auth(UserRole.TENANT), ReviewControllers.createReview);
router.get('/:propertyId', ReviewControllers.getReviewsForProperty);

export const ReviewRoutes = router;
