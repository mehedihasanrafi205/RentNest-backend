import { z } from 'zod';
import { BookingStatus } from '../../generated/prisma/enums';

export const BookingValidation = {
  create: z.object({
    body: z.object({
      propertyId: z.string().uuid('Invalid property ID'),
      startDate: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid start date format'),
      endDate: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid end date format'),
    }),
  }),
  updateStatus: z.object({
    body: z.object({
      status: z.nativeEnum(BookingStatus),
    }),
  }),
};
