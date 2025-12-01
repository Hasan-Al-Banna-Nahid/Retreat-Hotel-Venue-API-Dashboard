import { z } from "zod";
import { BookingStatus } from "./booking.interface";
export declare const createBookingSchema: z.ZodEffects<z.ZodObject<{
    venueId: z.ZodString;
    companyName: z.ZodString;
    email: z.ZodString;
    startDate: z.ZodEffects<z.ZodString, Date, string>;
    endDate: z.ZodEffects<z.ZodString, Date, string>;
    attendeeCount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    companyName: string;
    email: string;
    startDate: Date;
    endDate: Date;
    venueId: string;
    attendeeCount: number;
}, {
    companyName: string;
    email: string;
    startDate: string;
    endDate: string;
    venueId: string;
    attendeeCount: number;
}>, {
    companyName: string;
    email: string;
    startDate: Date;
    endDate: Date;
    venueId: string;
    attendeeCount: number;
}, {
    companyName: string;
    email: string;
    startDate: string;
    endDate: string;
    venueId: string;
    attendeeCount: number;
}>;
export declare const updateBookingStatusSchema: z.ZodObject<{
    status: z.ZodNativeEnum<typeof BookingStatus>;
}, "strip", z.ZodTypeAny, {
    status: BookingStatus;
}, {
    status: BookingStatus;
}>;
//# sourceMappingURL=booking.validation.d.ts.map