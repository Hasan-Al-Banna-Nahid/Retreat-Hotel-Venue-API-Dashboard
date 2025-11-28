import { Router } from "express";
import { VenueController } from "./venue.controller";

const router = Router();
const venueController = new VenueController();

router.get("/", venueController.getVenues.bind(venueController));
router.get("/:id", venueController.getVenueById.bind(venueController));
router.post("/", venueController.createVenue.bind(venueController));
router.put("/:id", venueController.updateVenue.bind(venueController));
router.delete("/:id", venueController.deleteVenue.bind(venueController));

export { router as venueRoutes };
