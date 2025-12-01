import { z } from "zod";

export const createVenueSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  city: z.string().min(1, "City is required"),
  capacity: z.number().int().positive("Capacity must be positive"),
  pricePerNight: z.number().int().positive("Price must be positive"),
  images: z.array(z.string().url()).min(1, "At least one image is required"),
  amenities: z.array(z.string()).default([]),
});

export const updateVenueSchema = createVenueSchema.partial();

// FIXED: Make all query params truly optional
export const venueFilterSchema = z.object({
  city: z.string().optional().catch(undefined),
  minCapacity: z
    .string()
    .optional()
    .catch(undefined)
    .transform((val) => (val ? parseInt(val) : undefined)),
  maxPrice: z
    .string()
    .optional()
    .catch(undefined)
    .transform((val) => (val ? parseInt(val) : undefined)),
  page: z
    .string()
    .default("1")
    .transform((val) => parseInt(val)),
  limit: z
    .string()
    .default("10")
    .transform((val) => parseInt(val)),
});
