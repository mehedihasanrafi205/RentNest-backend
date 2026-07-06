import express from "express";
import { BookingControllers } from "./booking.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../generated/prisma/enums";
import { validateRequest } from "../../middlewares/validateRequest";
import { BookingValidation } from "./booking.validation";

const router = express.Router();

router.post(
  "/book-property",
  auth(UserRole.TENANT),
  validateRequest(BookingValidation.create),
  BookingControllers.createBooking,
);

router.get(
  "/my-bookings",
  auth(UserRole.TENANT),
  BookingControllers.getTenantBookings,
);

router.get(
  "/landlord-requests",
  auth(UserRole.LANDLORD),
  BookingControllers.getLandlordBookings,
);

router.patch(
  "/:id/update-status",
  auth(UserRole.LANDLORD),
  validateRequest(BookingValidation.updateStatus),
  BookingControllers.updateBookingStatus,
);

router.get(
  "/",
  auth(UserRole.ADMIN),
  BookingControllers.getAllBookings,
);

export const BookingRoutes = router;
