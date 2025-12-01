"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBookingStatusSchema = exports.createBookingSchema = void 0;
const zod_1 = require("zod");
const booking_interface_1 = require("./booking.interface");
exports.createBookingSchema = zod_1.z
    .object({
    venueId: zod_1.z.string().min(1, "Venue ID is required"),
    companyName: zod_1.z.string().min(1, "Company name is required"),
    email: zod_1.z.string().email("Invalid email address"),
    startDate: zod_1.z.string().transform((str) => new Date(str)),
    endDate: zod_1.z.string().transform((str) => new Date(str)),
    attendeeCount: zod_1.z.number().int().positive("Attendee count must be positive"),
})
    .refine((data) => data.startDate < data.endDate, {
    message: "End date must be after start date",
    path: ["endDate"],
});
exports.updateBookingStatusSchema = zod_1.z.object({
    status: zod_1.z.nativeEnum(booking_interface_1.BookingStatus),
});
//# sourceMappingURL=booking.validation.js.map