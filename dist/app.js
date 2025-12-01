"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const venue_routes_1 = require("./src/app/modules/venues/venue.routes");
const booking_routes_1 = require("./src/app/modules/bookings/booking.routes");
const middleware_1 = require("./src/app/common/middleware");
const app = (0, express_1.default)();
exports.app = app;
app.use((0, compression_1.default)());
const allowedOrigins = [
    "https://retreat-zv61.vercel.app",
    "http://localhost:3000",
];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.includes(origin))
            return callback(null, true);
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/venues", venue_routes_1.venueRoutes);
app.use("/api/bookings", booking_routes_1.bookingRoutes);
app.get("/", (_req, res) => {
    res.json({
        success: true,
        message: "Hotel Venue API is running!",
        version: "1.0.0",
        documentation: "/api/health",
        database: "PostgreSQL on Railway",
    });
});
app.use(middleware_1.notFoundHandler);
app.use(middleware_1.errorHandler);
//# sourceMappingURL=app.js.map