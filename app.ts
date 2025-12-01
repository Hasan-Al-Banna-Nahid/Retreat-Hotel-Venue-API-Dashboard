import express from "express";
import cors from "cors";
import compression from "compression";
import { venueRoutes } from "./src/app/modules/venues/venue.routes";
import { bookingRoutes } from "./src/app/modules/bookings/booking.routes";
import { errorHandler, notFoundHandler } from "./src/app/common/middleware";

const app = express();

// Security middleware
app.use(compression());

// CORS configuration
const allowedOrigins = ["https://retreat-zv61.vercel.app"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
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
