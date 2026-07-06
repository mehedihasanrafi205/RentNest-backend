import express from 'express';
import { PaymentControllers } from './payment.controller';
import { auth } from '../../middlewares/auth';
import { UserRole } from '../../generated/prisma/enums';

const router = express.Router();

router.post(
  '/initiate',
  auth(UserRole.TENANT),
  PaymentControllers.processPayment
);

export const PaymentRoutes = router;