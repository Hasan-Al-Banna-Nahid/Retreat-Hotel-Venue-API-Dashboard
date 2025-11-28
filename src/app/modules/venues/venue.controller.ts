import { Request, Response } from "express";
import { VenueService } from "./venue.service";
import {
  venueFilterSchema,
  createVenueSchema,
  updateVenueSchema,
} from "./venue.validation";
import { sendSuccess, sendError } from "../../common/utils";
import { PaginatedResponse } from "../../common/types";

const venueService = new VenueService();

export class VenueController {
  async getVenues(req: Request, res: Response) {
    try {
      const validatedParams = venueFilterSchema.parse(req.query);

      const { venues, total } = await venueService.findAll(validatedParams);

      const response: PaginatedResponse<(typeof venues)[0]> = {
        success: true,
        data: venues,
        pagination: {
          page: validatedParams.page,
          limit: validatedParams.limit,
          total,
          totalPages: Math.ceil(total / validatedParams.limit),
          hasNext:
            validatedParams.page < Math.ceil(total / validatedParams.limit),
          hasPrev: validatedParams.page > 1,
        },
      };

      sendSuccess(res, response);
    } catch (error) {
      sendError(
        res,
        error instanceof Error ? error.message : "Internal server error"
      );
    }
  }

  async getVenueById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const venue = await venueService.findById(id);

      if (!venue) {
        return sendError(res, "Venue not found", 404);
      }

      sendSuccess(res, venue);
    } catch (error) {
      sendError(
        res,
        error instanceof Error ? error.message : "Internal server error"
      );
    }
  }

  async createVenue(req: Request, res: Response) {
    try {
      const validatedData = createVenueSchema.parse(req.body);
      const venue = await venueService.create(validatedData);

      sendSuccess(res, venue, "Venue created successfully", 201);
    } catch (error) {
      sendError(
        res,
        error instanceof Error ? error.message : "Internal server error"
      );
    }
  }

  async updateVenue(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const validatedData = updateVenueSchema.parse(req.body);

      const venue = await venueService.update(id, validatedData);

      if (!venue) {
        return sendError(res, "Venue not found", 404);
      }

      sendSuccess(res, venue, "Venue updated successfully");
    } catch (error) {
      sendError(
        res,
        error instanceof Error ? error.message : "Internal server error"
      );
    }
  }

  async deleteVenue(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await venueService.delete(id);

      sendSuccess(res, null, "Venue deleted successfully");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Internal server error";
      const statusCode = message.includes("not found") ? 404 : 400;
      sendError(res, message, statusCode);
    }
  }
}
