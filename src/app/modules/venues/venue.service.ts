import { prisma } from "../../config/database";
import {
  Venue,
  VenueFilterParams,
  CreateVenueInput,
  UpdateVenueInput,
  VenuePreview,
} from "./venue.interface";

export class VenueService {
  async findAll(
    filters: VenueFilterParams
  ): Promise<{ venues: VenuePreview[]; total: number }> {
    const { city, minCapacity, maxPrice, page = 1, limit = 10 } = filters;

    const where = {
      ...(city && { city: { contains: city, mode: "insensitive" } }),
      ...(minCapacity && { capacity: { gte: minCapacity } }),
      ...(maxPrice && { pricePerNight: { lte: maxPrice } }),
    };

    const [venues, total] = await Promise.all([
      prisma.venue.findMany({
        where,
        select: {
          id: true,
          name: true,
          city: true,
          capacity: true,
          pricePerNight: true,
          images: true,
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.venue.count({ where }),
    ]);

    return { venues, total };
  }

  async findById(id: string): Promise<Venue | null> {
    return prisma.venue.findUnique({
      where: { id },
    });
  }

  async create(data: CreateVenueInput): Promise<Venue> {
    return prisma.venue.create({
      data,
    });
  }

  async update(id: string, data: UpdateVenueInput): Promise<Venue> {
    return prisma.venue.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.venue.delete({
      where: { id },
    });
  }

  async validateCapacity(
    venueId: string,
    attendeeCount: number
  ): Promise<boolean> {
    const venue = await prisma.venue.findUnique({
      where: { id: venueId },
      select: { capacity: true },
    });

    return venue ? attendeeCount <= venue.capacity : false;
  }
}
