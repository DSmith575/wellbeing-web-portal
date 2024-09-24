import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters long',
  }),
});

export const eventSchema = z.object({
  eventName: z.string().min(1, 'Event name is required'),
  groupLimit: z
    .union([
      z.coerce.number().positive('Number must be greater than zero.'),
      z.literal(undefined),
      z.literal(null),
      z.literal(''),
    ])
    .optional(),
  eventType: z.string().optional(),
});
