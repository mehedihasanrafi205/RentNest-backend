import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { PaymentServices } from './payment.service';
import httpStatus from 'http-status';

const createPaymentIntent = catchAsync(async (req: Request, res: Response) => {
  const tenantId = req.user?.id as string;
  const { bookingId } = req.body;

  if (!bookingId) {
    throw new Error('Please provide bookingId in the request body.');
  }

  const result = await PaymentServices.createPaymentIntent(bookingId, tenantId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment intent created successfully!',
    data: result,
  });
});

const confirmPayment = catchAsync(async (req: Request, res: Response) => {
  const tenantId = req.user?.id as string;
  const { bookingId, transactionId } = req.body;

  if (!bookingId || !transactionId) {
    throw new Error('Please provide both bookingId and transactionId in the request body.');
  }

  const result = await PaymentServices.confirmPaymentInDB(bookingId, transactionId, tenantId);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Payment processed and recorded successfully!',
    data: result,
  });
});

export const PaymentControllers = {
  createPaymentIntent,
  confirmPayment,
};