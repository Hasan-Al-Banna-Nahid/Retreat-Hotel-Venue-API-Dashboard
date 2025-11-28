import { Request, Response } from "express";
import { BookingService } from "./booking.service";
import {
  createBookingSchema,
  updateBookingStatusSchema,
} from "./booking.validation";
import { sendSuccess, sendError } from "../../common/utils";

const bookingService = new BookingService();

export class BookingController {
  async createBooking(req: Request, res: Response) {
    try {
      const validatedData = createBookingSchema.parse(req.body);

      const booking = await bookingService.create(validatedData);

      sendSuccess(res, booking, "Booking inquiry submitted successfully", 201);
    } catch (error) {
      const statusCode =
        error instanceof Error && error.message.includes("not found")
          ? 404
          : 400;
      sendError(
        res,
        error instanceof Error ? error.message : "Internal server error",
        statusCode
      );
    }
  }

  async getBooking(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const booking = await bookingService.findById(id);

      if (!booking) {
        return sendError(res, "Booking not found", 404);
      }

      sendSuccess(res, booking);
    } catch (error) {
      sendError(
        res,
        error instanceof Error ? error.message : "Internal server error"
      );
    }
  }

  async getBookings(req: Request, res: Response) {
    try {
      const { page = "1", limit = "10" } = req.query;
      const { bookings, total } = await bookingService.findAll(
        parseInt(page as string),
        parseInt(limit as string)
      );

      sendSuccess(res, {
        data: bookings,
        pagination: {
          page: parseInt(page as string),
          limit: parseInt(limit as string),
          total,
          totalPages: Math.ceil(total / parseInt(limit as string)),
          hasNext:
            parseInt(page as string) <
            Math.ceil(total / parseInt(limit as string)),
          hasPrev: parseInt(page as string) > 1,
        },
      });
    } catch (error) {
      sendError(
        res,
        error instanceof Error ? error.message : "Internal server error"
      );
    }
  }

  async getBookingsByVenue(req: Request, res: Response) {
    try {
      const { venueId } = req.params;
      const bookings = await bookingService.findAllByVenue(venueId);

      sendSuccess(res, bookings);
    } catch (error) {
      sendError(
        res,
        error instanceof Error ? error.message : "Internal server error"
      );
    }
  }

  async updateBookingStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = updateBookingStatusSchema.parse(req.body);

      const booking = await bookingService.updateStatus(id, status);

      if (!booking) {
        return sendError(res, "Booking not found", 404);
      }

      sendSuccess(res, booking, "Booking status updated successfully");
    } catch (error) {
      sendError(
        res,
        error instanceof Error ? error.message : "Internal server error"
      );
    }
  }
}
