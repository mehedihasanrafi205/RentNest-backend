import { z } from 'zod';

export const PropertyValidation = {
  create: z.object({
    body: z.object({
      name: z.string().min(1, 'Name is required'),
      description: z.string().min(1, 'Description is required'),
      location: z.string().min(1, 'Location is required'),
      price: z.number().positive('Price must be positive'),
      categoryId: z.string().uuid('Invalid category ID'),
      images: z.array(z.string()).optional(),
      amenities: z.array(z.string()).optional(),
    }),
  }),
};
