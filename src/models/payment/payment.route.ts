import express from 'express';
import { PaymentControllers } from './payment.controller';
import { auth } from '../../middlewares/auth';
import { UserRole } from '../../generated/prisma/client';

const router = express.Router();

router.post(
  '/create-intent',
  auth(UserRole.TENANT),
  PaymentControllers.createPaymentIntent
);

router.post(
  '/confirm',
  auth(UserRole.TENANT),
  PaymentControllers.confirmPayment
);

export const PaymentRoutes = router;