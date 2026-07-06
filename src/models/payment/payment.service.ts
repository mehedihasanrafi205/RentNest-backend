
import { prisma } from '../../lib/prisma';
import { TPaymentPayload } from './payment.interface';

const processPaymentIntoDB = async (payload: TPaymentPayload, tenantId: string) => {
  const { bookingId, transactionId, amount } = payload;

  const result = await prisma.$transaction(async (tx) => {
    // 1. Verify target booking criteria matches user session validation
    const booking = await tx.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) throw new Error('Target booking record invalid or completely deleted!');
    if (booking.tenantId !== tenantId) throw new Error('Unauthorized system data profiling matching error!');

    // 2. Generate Payment Log Table Record Bindings
    const paymentRecord = await tx.payment.create({
      data: {
        bookingId,
        transactionId,
        amount,
        status: 'PAID',
      },
    });

    // 3. Complete system booking dynamic state automation mapping update
    await tx.booking.update({
      where: { id: bookingId },
      data: {
        status: 'APPROVED', 
      },
    });

    return paymentRecord;
  });

  return result;
};

export const PaymentServices = {
  processPaymentIntoDB,
};