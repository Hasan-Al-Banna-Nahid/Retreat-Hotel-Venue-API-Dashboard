export interface BookingInquiry {
    id: string;
    venueId: string;
    companyName: string;
    email: string;
    startDate: Date;
    endDate: Date;
    attendeeCount: number;
    status: BookingStatus;
    createdAt: Date;
    updatedAt: Date;
}
export interface CreateBookingInput {
    venueId: string;
    companyName: string;
    email: string;
    startDate: Date;
    endDate: Date;
    attendeeCount: number;
}
export declare enum BookingStatus {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    REJECTED = "REJECTED"
}
export type BookingPreview = Pick<BookingInquiry, "id" | "companyName" | "email" | "startDate" | "endDate" | "status" | "createdAt">;
export type BookingWithVenue = BookingInquiry & {
    venue: {
        name: string;
        city: string;
        capacity: number;
    };
};
//# sourceMappingURL=booking.interface.d.ts.map