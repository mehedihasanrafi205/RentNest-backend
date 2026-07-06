import Stripe from 'stripe';
import { prisma } from '../../lib/prisma';
import config from '../../config';

// Initialize Stripe
const stripe = new Stripe(config.stripe_secret_key as string, {
  apiVersion: '2025-01-27.acacia' as any, // use current or fallback api version
});

/**
 * Creates a Stripe Checkout Session for an APPROVED booking.
 */
const createCheckoutSession = async (bookingId: string, tenantId: string, email?: string) => {
  // 1. Verify booking exists and belongs to the tenant
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  });

  if (!booking) {
    throw new Error('Booking not found!');
  }

  if (booking.tenantId !== tenantId) {
    throw new Error('You are not authorized to pay for this booking!');
  }

  if (booking.status !== 'APPROVED') {
    throw new Error('You can only pay for APPROVED bookings.');
  }

  const amountInCents = Math.round(Number(booking.totalCost) * 100);

  if (amountInCents <= 0) {
    throw new Error('Invalid booking cost.');
  }

  // 3. Create a Checkout Session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    customer_email: email, // <-- Added email here
    line_items: [
      {
        price_data: {
          currency: 'bdt',
          product_data: {
            name: `RentNest Property Booking`,
            description: `Payment for booking ID: ${bookingId}`,
          },
          unit_amount: amountInCents,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    // Using dummy success/cancel URLs since there's no real frontend
    success_url: 'http://localhost:3000/api/payments/success',
    cancel_url: 'http://localhost:3000/api/payments/cancel',
    metadata: {
      bookingId,
      tenantId,
    },
  });

  return {
    url: session.url,
  };
};

/**
 * Confirms payment in our DB after Stripe processes it.
 */
const confirmPaymentInDB = async (
  bookingId: string, 
  transactionId: string, 
  tenantId: string
) => {
  const result = await prisma.$transaction(async (tx) => {
    // 1. Verify booking
    const booking = await tx.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) throw new Error('Target booking record invalid or completely deleted!');
    if (booking.tenantId !== tenantId) throw new Error('Unauthorized system data profiling matching error!');

    // Prevent duplicate payment processing
    const existingPayment = await tx.payment.findFirst({
      where: { bookingId },
    });

    if (existingPayment) {
      throw new Error('Payment has already been processed for this booking!');
    }

    // 2. Generate Payment Log Table Record Bindings
    const paymentRecord = await tx.payment.create({
      data: {
        bookingId,
        transactionId,
        amount: booking.totalCost,
        status: 'PAID',
      },
    });

    // 3. (Optional) You can update the Booking status here if you had a 'PAID' or 'COMPLETED' status.
    // For now, it stays 'APPROVED', but the existence of a Payment record indicates it is paid.

    return paymentRecord;
  });

  return result;
};

const getTenantPaymentHistory = async (tenantId: string) => {
  const payments = await prisma.payment.findMany({
    where: {
      booking: {
        tenantId,
      },
    },
    include: {
      booking: {
        include: {
          property: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return payments;
};

export const PaymentServices = {
  createCheckoutSession,
  confirmPaymentInDB,
  getTenantPaymentHistory,
  stripe,
};