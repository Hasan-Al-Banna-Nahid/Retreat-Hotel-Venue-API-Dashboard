"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.venueFilterSchema = exports.updateVenueSchema = exports.createVenueSchema = void 0;
const zod_1 = require("zod");
exports.createVenueSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    description: zod_1.z.string().optional(),
    city: zod_1.z.string().min(1, "City is required"),
    capacity: zod_1.z.number().int().positive("Capacity must be positive"),
    pricePerNight: zod_1.z.number().int().positive("Price must be positive"),
    images: zod_1.z.array(zod_1.z.string().url()).min(1, "At least one image is required"),
    amenities: zod_1.z.array(zod_1.z.string()).default([]),
});
exports.updateVenueSchema = exports.createVenueSchema.partial();
exports.venueFilterSchema = zod_1.z.object({
    city: zod_1.z.string().optional().catch(undefined),
    minCapacity: zod_1.z
        .string()
        .optional()
        .catch(undefined)
        .transform((val) => (val ? parseInt(val) : undefined)),
    maxPrice: zod_1.z
        .string()
        .optional()
        .catch(undefined)
        .transform((val) => (val ? parseInt(val) : undefined)),
    page: zod_1.z
        .string()
        .default("1")
        .transform((val) => parseInt(val)),
    limit: zod_1.z
        .string()
        .default("10")
        .transform((val) => parseInt(val)),
});
//# sourceMappingURL=venue.validation.js.map