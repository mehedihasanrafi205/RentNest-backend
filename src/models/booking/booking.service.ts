import { PropertyStatus } from '../../generated/prisma/enums';
import { prisma } from '../../lib/prisma';
import { TBookingPayload } from './booking.interface';

const createBookingIntoDB = async (payload: TBookingPayload, tenantId: string) => {
  const { propertyId } = payload;

  // Transaction mapping pipeline
  const result = await prisma.$transaction(async (tx) => {
    // 1. Fetch target listing details with absolute strict checks
    const property = await tx.property.findUnique({
      where: { id: propertyId },
    });

    if (!property) {
      throw new Error('Property listing not found inside system registries!');
    }

    if (property.status === PropertyStatus.RENTED) {
      throw new Error('This property is already rented by another tenant!');
    }

    const calculatedCost = property.price ? Number(property.price) : 0.0;

    // 2. Map database schema required primitives 
    const bookingData = await tx.booking.create({
      data: {
        propertyId,
        tenantId,
        totalCost: calculatedCost, 
      },
    });

    // 3. Update property operational status into database cleanly
    await tx.property.update({
      where: { id: propertyId },
      data: {
        status: PropertyStatus.RENTED, 
      },
    });

    return bookingData;
  });

  return result;
};

const getTenantBookingsFromDB = async (tenantId: string) => {
  const result = await prisma.booking.findMany({
    where: { tenantId },
    include: {
      property: true,
    },
  });
  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  getTenantBookingsFromDB,
};