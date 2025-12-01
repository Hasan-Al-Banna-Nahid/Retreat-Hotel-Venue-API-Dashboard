"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoutes = void 0;
const express_1 = require("express");
const booking_controller_1 = require("./booking.controller");
const router = (0, express_1.Router)();
exports.bookingRoutes = router;
const bookingController = new booking_controller_1.BookingController();
router.post("/", bookingController.createBooking.bind(bookingController));
router.get("/", bookingController.getBookings.bind(bookingController));
router.get("/:id", bookingController.getBooking.bind(bookingController));
router.get("/venue/:venueId", bookingController.getBookingsByVenue.bind(bookingController));
router.put("/:id/status", bookingController.updateBookingStatus.bind(bookingController));
//# sourceMappingURL=booking.routes.js.map