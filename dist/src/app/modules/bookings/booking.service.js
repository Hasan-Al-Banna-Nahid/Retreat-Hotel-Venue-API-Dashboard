"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const database_1 = require("../../config/database");
const venue_service_1 = require("../venues/venue.service");
const venueService = new venue_service_1.VenueService();
const convertBookingStatus = (status) => {
    return status;
};
class BookingService {
    async create(data) {
        const venue = await venueService.findById(data.venueId);
        if (!venue) {
            throw new Error("Venue not found");
        }
        const isValidCapacity = await venueService.validateCapacity(data.venueId, data.attendeeCount);
        if (!isValidCapacity) {
            throw new Error("Attendee count exceeds venue capacity");
        }
        const overlappingBooking = await database_1.prisma.bookingInquiry.findFirst({
            where: {
                venueId: data.venueId,
                OR: [
                    {
                        startDate: { lte: data.endDate },
                        endDate: { gte: data.startDate },
                    },
                ],
                status: { in: ["PENDING", "CONFIRMED"] },
            },
        });
        if (overlappingBooking) {
            throw new Error("Venue is not available for the selected dates");
        }
        const result = await database_1.prisma.bookingInquiry.create({
            data,
            include: {
                venue: {
                    select: {
                        name: true,
                        city: true,
                        capacity: true,
                    },
                },
            },
        });
        return {
            ...result,
            status: convertBookingStatus(result.status),
        };
    }
    async findById(id) {
        const result = await database_1.prisma.bookingInquiry.findUnique({
            where: { id },
            include: {
                venue: {
                    select: {
                        name: true,
                        city: true,
                        capacity: true,
                    },
                },
            },
        });
        if (!result)
            return null;
        return {
            ...result,
            status: convertBookingStatus(result.status),
        };
    }
    async findAll(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [bookings, total] = await Promise.all([
            database_1.prisma.bookingInquiry.findMany({
                skip,
                take: limit,
                include: {
                    venue: {
                        select: {
                            name: true,
                            city: true,
                            capacity: true,
                        },
                    },
                },
                orderBy: { createdAt: "desc" },
            }),
            database_1.prisma.bookingInquiry.count(),
        ]);
        const convertedBookings = bookings.map((booking) => ({
            ...booking,
            status: convertBookingStatus(booking.status),
        }));
        return { bookings: convertedBookings, total };
    }
    async findAllByVenue(venueId) {
        const results = await database_1.prisma.bookingInquiry.findMany({
            where: { venueId },
            include: {
                venue: {
                    select: {
                        name: true,
                        city: true,
                        capacity: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });
        return results.map((result) => ({
            ...result,
            status: convertBookingStatus(result.status),
        }));
    }
    async updateStatus(id, status) {
        const prismaStatus = status;
        const result = await database_1.prisma.bookingInquiry.update({
            where: { id },
            data: { status: prismaStatus },
            include: {
                venue: {
                    select: {
                        name: true,
                        city: true,
                        capacity: true,
                    },
                },
            },
        });
        return {
            ...result,
            status: convertBookingStatus(result.status),
        };
    }
}
exports.BookingService = BookingService;
//# sourceMappingURL=booking.service.js.map