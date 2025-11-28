import { Router } from "express";
import { BookingController } from "./booking.controller";

const router = Router();
const bookingController = new BookingController();

router.post("/", bookingController.createBooking.bind(bookingController));
router.get("/", bookingController.getBookings.bind(bookingController));
router.get("/:id", bookingController.getBooking.bind(bookingController));
router.get(
  "/venue/:venueId",
  bookingController.getBookingsByVenue.bind(bookingController)
);
router.put(
  "/:id/status",
  bookingController.updateBookingStatus.bind(bookingController)
);

export { router as bookingRoutes };
