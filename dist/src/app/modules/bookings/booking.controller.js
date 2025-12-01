"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const booking_service_1 = require("./booking.service");
const booking_validation_1 = require("./booking.validation");
const utils_1 = require("../../common/utils");
const bookingService = new booking_service_1.BookingService();
class BookingController {
    async createBooking(req, res) {
        try {
            const validatedData = booking_validation_1.createBookingSchema.parse(req.body);
            const booking = await bookingService.create(validatedData);
            (0, utils_1.sendSuccess)(res, booking, "Booking inquiry submitted successfully", 201);
        }
        catch (error) {
            const statusCode = error instanceof Error && error.message.includes("not found")
                ? 404
                : 400;
            (0, utils_1.sendError)(res, error instanceof Error ? error.message : "Internal server error", statusCode);
        }
    }
    async getBooking(req, res) {
        try {
            const { id } = req.params;
            const booking = await bookingService.findById(id);
            if (!booking) {
                return (0, utils_1.sendError)(res, "Booking not found", 404);
            }
            (0, utils_1.sendSuccess)(res, booking);
        }
        catch (error) {
            (0, utils_1.sendError)(res, error instanceof Error ? error.message : "Internal server error");
        }
    }
    async getBookings(req, res) {
        try {
            const { page = "1", limit = "10" } = req.query;
            const { bookings, total } = await bookingService.findAll(parseInt(page), parseInt(limit));
            (0, utils_1.sendSuccess)(res, {
                data: bookings,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    totalPages: Math.ceil(total / parseInt(limit)),
                    hasNext: parseInt(page) <
                        Math.ceil(total / parseInt(limit)),
                    hasPrev: parseInt(page) > 1,
                },
            });
        }
        catch (error) {
            (0, utils_1.sendError)(res, error instanceof Error ? error.message : "Internal server error");
        }
    }
    async getBookingsByVenue(req, res) {
        try {
            const { venueId } = req.params;
            const bookings = await bookingService.findAllByVenue(venueId);
            (0, utils_1.sendSuccess)(res, bookings);
        }
        catch (error) {
            (0, utils_1.sendError)(res, error instanceof Error ? error.message : "Internal server error");
        }
    }
    async updateBookingStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = booking_validation_1.updateBookingStatusSchema.parse(req.body);
            const booking = await bookingService.updateStatus(id, status);
            if (!booking) {
                return (0, utils_1.sendError)(res, "Booking not found", 404);
            }
            (0, utils_1.sendSuccess)(res, booking, "Booking status updated successfully");
        }
        catch (error) {
            (0, utils_1.sendError)(res, error instanceof Error ? error.message : "Internal server error");
        }
    }
}
exports.BookingController = BookingController;
//# sourceMappingURL=booking.controller.js.map