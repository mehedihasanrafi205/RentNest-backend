import { z } from 'zod';

export const ReviewValidation = {
  create: z.object({
    body: z.object({
      propertyId: z.string().uuid('Invalid property ID'),
      rating: z.number().min(1, 'Rating must be between 1 and 5').max(5, 'Rating must be between 1 and 5'),
      comment: z.string().min(1, 'Comment is required'),
    }),
  }),
};
