import { z } from 'zod';
import { BookingStatus } from '../../generated/prisma/enums';

export const BookingValidation = {
  create: z.object({
    body: z.object({
      propertyId: z.string().uuid('Invalid property ID'),
    }),
  }),
  updateStatus: z.object({
    body: z.object({
      status: z.nativeEnum(BookingStatus),
    }),
  }),
};
