import { z } from 'zod';

export const CategoryValidation = {
  create: z.object({
    body: z.object({
      name: z.string().min(1, 'Category name is required'),
      description: z.string().optional(),
    }),
  }),
};
