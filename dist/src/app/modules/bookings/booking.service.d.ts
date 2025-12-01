import { BookingInquiry, CreateBookingInput, BookingWithVenue, BookingStatus as InterfaceBookingStatus } from "./booking.interface";
export declare class BookingService {
    create(data: CreateBookingInput): Promise<BookingWithVenue>;
    findById(id: string): Promise<BookingWithVenue | null>;
    findAll(page?: number, limit?: number): Promise<{
        bookings: BookingWithVenue[];
        total: number;
    }>;
    findAllByVenue(venueId: string): Promise<BookingInquiry[]>;
    updateStatus(id: string, status: InterfaceBookingStatus): Promise<BookingWithVenue | null>;
}
//# sourceMappingURL=booking.service.d.ts.map