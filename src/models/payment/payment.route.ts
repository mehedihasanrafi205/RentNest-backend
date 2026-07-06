import express from 'express';
import { PaymentControllers } from './payment.controller';
import { auth } from '../../middlewares/auth';
import { UserRole } from '../../generated/prisma/client';

const router = express.Router();

router.post(
  '/create-checkout-session',
  auth(UserRole.TENANT),
  PaymentControllers.createCheckoutSession
);

router.get(
  '/my-payments',
  auth(UserRole.TENANT),
  PaymentControllers.getTenantPayments
);

export const PaymentRoutes = router;