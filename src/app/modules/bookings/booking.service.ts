import { prisma } from "../../config/database";
import {
  BookingInquiry,
  CreateBookingInput,
  BookingWithVenue,
  BookingStatus as InterfaceBookingStatus,
} from "./booking.interface";
import { VenueService } from "../venues/venue.service";

const venueService = new VenueService();

// Import Prisma's BookingStatus
import { BookingStatus as PrismaBookingStatus } from "@prisma/client";

// Helper to convert Prisma status to interface status
const convertBookingStatus = (
  status: PrismaBookingStatus
): InterfaceBookingStatus => {
  return status as InterfaceBookingStatus;
};

export class BookingService {
  async create(data: CreateBookingInput): Promise<BookingWithVenue> {
    // Check if venue exists
    const venue = await venueService.findById(data.venueId);
    if (!venue) {
      throw new Error("Venue not found");
    }

    const isValidCapacity = await venueService.validateCapacity(
      data.venueId,
      data.attendeeCount
    );

    if (!isValidCapacity) {
      throw new Error("Attendee count exceeds venue capacity");
    }

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

    const result = await prisma.bookingInquiry.create({
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

    // Convert the result to match the interface
    return {
      ...result,
      status: convertBookingStatus(result.status),
    };
  }

  async findById(id: string): Promise<BookingWithVenue | null> {
    const result = await prisma.bookingInquiry.findUnique({
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

    if (!result) return null;

    return {
      ...result,
      status: convertBookingStatus(result.status),
    };
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

    // Convert each booking's status
    const convertedBookings = bookings.map((booking) => ({
      ...booking,
      status: convertBookingStatus(booking.status),
    }));

    return { bookings: convertedBookings, total };
  }

  async findAllByVenue(venueId: string): Promise<BookingInquiry[]> {
    const results = await prisma.bookingInquiry.findMany({
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

    // Convert status for each booking
    return results.map((result) => ({
      ...result,
      status: convertBookingStatus(result.status),
    }));
  }

  async updateStatus(
    id: string,
    status: InterfaceBookingStatus
  ): Promise<BookingWithVenue | null> {
    // Convert interface status to Prisma status
    const prismaStatus = status as PrismaBookingStatus;

    const result = await prisma.bookingInquiry.update({
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
