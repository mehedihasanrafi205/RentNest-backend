import express from 'express';
import { BookingControllers } from './booking.controller';
import { auth } from '../../middlewares/auth';
import { UserRole } from '../../generated/prisma/enums';


const router = express.Router();


router.post(
  '/book-property',
  auth(UserRole.TENANT),
  BookingControllers.createBooking
);

router.get(
  '/my-bookings',
  auth(UserRole.TENANT),
  BookingControllers.getTenantBookings
);

export const BookingRoutes = router;