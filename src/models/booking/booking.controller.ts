import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";
import httpStatus from "http-status";

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const tenantId = req.user?.id as string;
  const result = await BookingServices.createBookingIntoDB(req.body, tenantId);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Property booked successfully!",
    data: result,
  });
});

const getTenantBookings = catchAsync(async (req: Request, res: Response) => {
  const tenantId = req.user?.id as string;
  const result = await BookingServices.getTenantBookingsFromDB(tenantId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tenant bookings retrieved successfully!",
    data: result,
  });
});

const getLandlordBookings = catchAsync(async (req: Request, res: Response) => {
  const landlordId = req.user?.id as string;
  const result = await BookingServices.getLandlordBookingsFromDB(landlordId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Landlord bookings requests retrieved successfully!",
    data: result,
  });
});

const updateBookingStatus = catchAsync(async (req: Request, res: Response) => {
  const landlordId = req.user?.id as string;
  const { id } = req.params;
  const { status } = req.body;

  const result = await BookingServices.updateBookingStatusInDB(
    id as string,
    status,
    landlordId,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Booking request status updated to ${status} successfully!`,
    data: result,
  });
});

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingServices.getAllBookingsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All bookings retrieved successfully!",
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  getTenantBookings,
  getLandlordBookings,
  updateBookingStatus,
  getAllBookings,
};
