import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters long',
  }),
});

export const createEventSchema = z.object({
  eventName: z.string().min(1, 'Event name is required'),
  groupLimit: z
    .union([
      z.coerce.number().positive('Number must be greater than zero.'),
      z.literal(undefined),
      z.literal(null),
      z.literal(''),
    ])
    .optional(),
  eventDate: z.preprocess((value) => (value ? new Date(value) : null), z.date()),
  eventCategory: z.string().min(1, 'Event category is required'),
  eventRecurrence: z.string().min(1, 'Event recurrence is required'),
});
