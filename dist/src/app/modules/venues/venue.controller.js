"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenueController = void 0;
const venue_service_1 = require("./venue.service");
const venue_validation_1 = require("./venue.validation");
const utils_1 = require("../../common/utils");
const venueService = new venue_service_1.VenueService();
class VenueController {
    async getVenues(req, res) {
        try {
            const validatedParams = venue_validation_1.venueFilterSchema.parse(req.query);
            const { venues, total } = await venueService.findAll(validatedParams);
            const response = {
                success: true,
                data: venues,
                pagination: {
                    page: validatedParams.page,
                    limit: validatedParams.limit,
                    total,
                    totalPages: Math.ceil(total / validatedParams.limit),
                    hasNext: validatedParams.page < Math.ceil(total / validatedParams.limit),
                    hasPrev: validatedParams.page > 1,
                },
            };
            (0, utils_1.sendSuccess)(res, response);
        }
        catch (error) {
            (0, utils_1.sendError)(res, error instanceof Error ? error.message : "Internal server error");
        }
    }
    async getVenueById(req, res) {
        try {
            const { id } = req.params;
            const venue = await venueService.findById(id);
            if (!venue) {
                return (0, utils_1.sendError)(res, "Venue not found", 404);
            }
            (0, utils_1.sendSuccess)(res, venue);
        }
        catch (error) {
            (0, utils_1.sendError)(res, error instanceof Error ? error.message : "Internal server error");
        }
    }
    async createVenue(req, res) {
        try {
            const validatedData = venue_validation_1.createVenueSchema.parse(req.body);
            const venue = await venueService.create(validatedData);
            (0, utils_1.sendSuccess)(res, venue, "Venue created successfully", 201);
        }
        catch (error) {
            (0, utils_1.sendError)(res, error instanceof Error ? error.message : "Internal server error");
        }
    }
    async updateVenue(req, res) {
        try {
            const { id } = req.params;
            const validatedData = venue_validation_1.updateVenueSchema.parse(req.body);
            const venue = await venueService.update(id, validatedData);
            if (!venue) {
                return (0, utils_1.sendError)(res, "Venue not found", 404);
            }
            (0, utils_1.sendSuccess)(res, venue, "Venue updated successfully");
        }
        catch (error) {
            (0, utils_1.sendError)(res, error instanceof Error ? error.message : "Internal server error");
        }
    }
    async deleteVenue(req, res) {
        try {
            const { id } = req.params;
            await venueService.delete(id);
            (0, utils_1.sendSuccess)(res, null, "Venue deleted successfully");
        }
        catch (error) {
            const message = error instanceof Error ? error.message : "Internal server error";
            const statusCode = message.includes("not found") ? 404 : 400;
            (0, utils_1.sendError)(res, message, statusCode);
        }
    }
}
exports.VenueController = VenueController;
//# sourceMappingURL=venue.controller.js.map