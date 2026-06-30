import { z } from "zod";

/** Login credentials. */
export const credentialsSchema = z.object({
  email: z.string().email({ message: "Enter a valid email." }).trim(),
  password: z.string().min(1, { message: "Enter your password." }),
});

/** Registration — stricter password rules. */
export const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).trim(),
  email: z.string().email({ message: "Enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .regex(/[a-zA-Z]/, { message: "Include at least one letter." })
    .regex(/[0-9]/, { message: "Include at least one number." }),
});

/** Create-booking input (from the booking step). */
export const bookingSchema = z.object({
  slug: z.string().min(1),
  travellers: z.coerce.number().int().min(1).max(10),
  departureDate: z.string().min(1, { message: "Pick a departure date." }),
  note: z.string().max(500).optional(),
});

/** Profile update. */
export const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).trim(),
  image: z.string().url({ message: "Enter a valid image URL." }).optional().or(z.literal("")),
});

/** Change password. */
export const passwordSchema = z
  .object({
    current: z.string().min(1, { message: "Enter your current password." }),
    next: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .regex(/[a-zA-Z]/, { message: "Include at least one letter." })
      .regex(/[0-9]/, { message: "Include at least one number." }),
  });
