"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.venueRoutes = void 0;
const express_1 = require("express");
const venue_controller_1 = require("./venue.controller");
const router = (0, express_1.Router)();
exports.venueRoutes = router;
const venueController = new venue_controller_1.VenueController();
router.get("/", venueController.getVenues.bind(venueController));
router.get("/:id", venueController.getVenueById.bind(venueController));
router.post("/", venueController.createVenue.bind(venueController));
router.put("/:id", venueController.updateVenue.bind(venueController));
router.delete("/:id", venueController.deleteVenue.bind(venueController));
//# sourceMappingURL=venue.routes.js.map