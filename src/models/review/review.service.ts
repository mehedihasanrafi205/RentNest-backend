import { prisma } from '../../lib/prisma';
import { Review, BookingStatus } from '../../generated/prisma/client';

const createReviewIntoDB = async (tenantId: string, payload: Partial<Review>) => {
  // Check if tenant has an approved booking for this property
  const hasApprovedBooking = await prisma.booking.findFirst({
    where: {
      tenantId,
      propertyId: payload.propertyId,
      status: BookingStatus.APPROVED,
    },
  });

  if (!hasApprovedBooking) {
    throw new Error('You can only review properties that you have rented and been approved for.');
  }

  // Check if user already reviewed this property (optional, but good practice)
  const existingReview = await prisma.review.findFirst({
    where: {
      tenantId,
      propertyId: payload.propertyId,
    },
  });

  if (existingReview) {
    throw new Error('You have already reviewed this property.');
  }

  const result = await prisma.review.create({
    data: {
      ...payload,
      tenantId,
    } as Review,
  });

  return result;
};

const getReviewsForPropertyFromDB = async (propertyId: string) => {
  const result = await prisma.review.findMany({
    where: {
      propertyId,
    },
    include: {
      tenant: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return result;
};

export const ReviewServices = {
  createReviewIntoDB,
  getReviewsForPropertyFromDB,
};
