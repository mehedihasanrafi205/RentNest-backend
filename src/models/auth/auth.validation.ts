import { z } from 'zod';
import { UserRole } from '../../generated/prisma/enums';

export const AuthValidation = {
  register: z.object({
    body: z.object({
      name: z.string().min(1, 'Name is required'),
      email: z.string().email('Invalid email address'),
      password: z.string().min(6, 'Password must be at least 6 characters'),
      role: z.nativeEnum(UserRole),
    }),
  }),
  login: z.object({
    body: z.object({
      email: z.string().email('Invalid email address'),
      password: z.string().min(1, 'Password is required'),
    }),
  }),
};
