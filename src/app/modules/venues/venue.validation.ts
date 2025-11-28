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

export const venueFilterSchema = z.object({
  city: z.string().optional(),
  minCapacity: z
    .string()
    .transform(Number)
    .pipe(z.number().int().nonnegative().optional()),
  maxPrice: z
    .string()
    .transform(Number)
    .pipe(z.number().int().nonnegative().optional()),
  page: z
    .string()
    .transform(Number)
    .pipe(z.number().int().positive().default(1)),
  limit: z
    .string()
    .transform(Number)
    .pipe(z.number().int().positive().max(100).default(10)),
});
