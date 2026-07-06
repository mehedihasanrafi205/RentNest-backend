import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { BookingServices } from './booking.service';
import httpStatus from 'http-status';

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const tenantId = req.user?.id as string; 
  const result = await BookingServices.createBookingIntoDB(req.body, tenantId);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Property booked successfully!',
    data: result,
  });
});

const getTenantBookings = catchAsync(async (req: Request, res: Response) => {
  const tenantId = req.user?.id as string;
  const result = await BookingServices.getTenantBookingsFromDB(tenantId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tenant bookings retrieved successfully!',
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  getTenantBookings,
};