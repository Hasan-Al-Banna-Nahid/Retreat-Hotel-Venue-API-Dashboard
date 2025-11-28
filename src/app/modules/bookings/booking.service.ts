import { prisma } from "../../config/database";
import {
  BookingInquiry,
  CreateBookingInput,
  BookingWithVenue,
  BookingStatus,
} from "./booking.interface";
import { VenueService } from "../venues/venue.service";

const venueService = new VenueService();

export class BookingService {
  async create(data: CreateBookingInput): Promise<BookingWithVenue> {
    // Check if venue exists
    const venue = await venueService.findById(data.venueId);
    if (!venue) {
      throw new Error("Venue not found");
    }

    // O(1) capacity validation
    const isValidCapacity = await venueService.validateCapacity(
      data.venueId,
      data.attendeeCount
    );

    if (!isValidCapacity) {
      throw new Error("Attendee count exceeds venue capacity");
    }

    // O(n) - Check for overlapping bookings (could be optimized with proper indexing)
    const overlappingBooking = await prisma.bookingInquiry.findFirst({
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

    return prisma.bookingInquiry.create({
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
  }

  async findById(id: string): Promise<BookingWithVenue | null> {
    return prisma.bookingInquiry.findUnique({
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
  }

  async findAll(
    page: number = 1,
    limit: number = 10
  ): Promise<{ bookings: BookingWithVenue[]; total: number }> {
    const skip = (page - 1) * limit;

    const [bookings, total] = await Promise.all([
      prisma.bookingInquiry.findMany({
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
      prisma.bookingInquiry.count(),
    ]);

    return { bookings, total };
  }

  async findAllByVenue(venueId: string): Promise<BookingInquiry[]> {
    return prisma.bookingInquiry.findMany({
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
  }

  async updateStatus(
    id: string,
    status: BookingStatus
  ): Promise<BookingWithVenue | null> {
    return prisma.bookingInquiry.update({
      where: { id },
      data: { status },
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
  }
}
