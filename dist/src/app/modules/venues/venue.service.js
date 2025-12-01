"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenueService = void 0;
const database_1 = require("../../config/database");
class VenueService {
    async findAll(filters) {
        const { city, minCapacity, maxPrice, page = 1, limit = 10 } = filters;
        const where = {
            ...(city && {
                city: {
                    contains: city,
                    mode: "insensitive",
                },
            }),
            ...(minCapacity && { capacity: { gte: minCapacity } }),
            ...(maxPrice && { pricePerNight: { lte: maxPrice } }),
        };
        const [venues, total] = await Promise.all([
            database_1.prisma.venue.findMany({
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
            database_1.prisma.venue.count({ where }),
        ]);
        return {
            venues: venues,
            total,
        };
    }
    async findById(id) {
        const result = await database_1.prisma.venue.findUnique({
            where: { id },
        });
        return result;
    }
    async create(data) {
        const result = await database_1.prisma.venue.create({
            data,
        });
        return result;
    }
    async update(id, data) {
        const result = await database_1.prisma.venue.update({
            where: { id },
            data,
        });
        return result;
    }
    async delete(id) {
        await database_1.prisma.venue.delete({
            where: { id },
        });
    }
    async validateCapacity(venueId, attendeeCount) {
        const venue = await database_1.prisma.venue.findUnique({
            where: { id: venueId },
            select: { capacity: true },
        });
        return venue ? attendeeCount <= venue.capacity : false;
    }
}
exports.VenueService = VenueService;
//# sourceMappingURL=venue.service.js.map