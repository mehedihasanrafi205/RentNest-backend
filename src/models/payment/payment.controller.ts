import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { PaymentServices } from './payment.service';
import httpStatus from 'http-status';

const processPayment = catchAsync(async (req: Request, res: Response) => {
  const tenantId = req.user?.id as string;
  const result = await PaymentServices.processPaymentIntoDB(req.body, tenantId);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Payment tracking executed and booking confirmation automated!',
    data: result,
  });
});

export const PaymentControllers = {
  processPayment,
};