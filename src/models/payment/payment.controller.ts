import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { PaymentServices } from './payment.service';
import httpStatus from 'http-status';
import config from '../../config';

const createCheckoutSession = catchAsync(async (req: Request, res: Response) => {
  const tenantId = req.user?.id as string;
  const { bookingId } = req.body;

  if (!bookingId) {
    throw new Error('Please provide bookingId in the request body.');
  }

  const result = await PaymentServices.createCheckoutSession(bookingId, tenantId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Checkout session created successfully!',
    data: result,
  });
});

const handleStripeWebhook = catchAsync(async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;

  let event;

  try {
    event = PaymentServices.stripe.webhooks.constructEvent(
      req.body,
      sig,
      config.stripe_webhook_secret as string
    );
  } catch (err: any) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;
    const { bookingId, tenantId } = session.metadata;

    if (bookingId && tenantId) {
      await PaymentServices.confirmPaymentInDB(bookingId, session.id, tenantId);
    }
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send();
});

// We keep confirmPayment just in case the frontend still calls it, but webhook is better.
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
  createCheckoutSession,
  confirmPayment,
  handleStripeWebhook,
};