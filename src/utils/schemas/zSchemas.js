import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

export const createEventSchema = z.object({
  eventName: z
    .string()
    .min(1, "Event name is required")
    .max(20, "Event location must be less than 20 characters"),
  groupLimit: z
    .union([
      z.coerce.number().positive("Number must be greater than zero."),
      z.literal(undefined),
      z.literal(null),
      z.literal(""),
    ])
    .optional(),
  eventDate: z.preprocess((value) => (value ? new Date(value) : null), z.date()),
  eventLocation: z.string().min(1, "Event location is required"),
  eventCategory: z.string().min(1, "Event category is required"),
  eventRecurrence: z.string().min(1, "Event recurrence is required"),
  eventColor: z.array().optional(),
});
