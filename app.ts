import express from "express";
import cors from "cors";
import compression from "compression";
import { venueRoutes } from "./src/app/modules/venues/venue.routes";
import { bookingRoutes } from "./src/app/modules/bookings/booking.routes";
import { errorHandler, notFoundHandler } from "./src/app/common/middleware";
import { CORS_ORIGIN } from "./src/app/config/constants";

const app = express();

// Security middleware
app.use(compression());

// CORS configuration
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api/venues", venueRoutes);
app.use("/api/bookings", bookingRoutes);

// Root endpoint
app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Hotel Venue API is running!",
    version: "1.0.0",
    documentation: "/api/health",
    database: "PostgreSQL on Railway",
  });
});

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

export { app };
