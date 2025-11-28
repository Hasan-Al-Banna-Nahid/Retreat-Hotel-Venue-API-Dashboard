import { z } from "zod";
import { BookingStatus } from "./booking.interface";

export const createBookingSchema = z
  .object({
    venueId: z.string().min(1, "Venue ID is required"),
    companyName: z.string().min(1, "Company name is required"),
    email: z.string().email("Invalid email address"),
    startDate: z.string().transform((str) => new Date(str)),
    endDate: z.string().transform((str) => new Date(str)),
    attendeeCount: z.number().int().positive("Attendee count must be positive"),
  })
  .refine((data) => data.startDate < data.endDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  });

export const updateBookingStatusSchema = z.object({
  status: z.nativeEnum(BookingStatus),
});
