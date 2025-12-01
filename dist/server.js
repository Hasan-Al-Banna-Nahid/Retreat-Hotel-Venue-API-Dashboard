"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = require("./app");
const constants_1 = require("./src/app/config/constants");
const database_1 = require("./src/app/config/database");
dotenv_1.default.config();
console.log("🚀 Starting Hotel Venue API...");
console.log("🔧 Environment:", process.env.NODE_ENV);
console.log("🔧 Port:", process.env.PORT);
const startServer = async () => {
    try {
        console.log("🔌 Testing database connection...");
        const dbConnected = await (0, database_1.testDatabaseConnection)();
        if (!dbConnected) {
            console.error("❌ Cannot start server without database connection");
            console.log("💡 Please check your DATABASE_URL in .env file");
            process.exit(1);
        }
        const server = app_1.app.listen(constants_1.PORT, () => {
            console.log(`✅ Server running in ${constants_1.NODE_ENV} mode on port ${constants_1.PORT}`);
            console.log(`📊 Database: PostgreSQL on Railway`);
            console.log(`🌐 Health check: http://localhost:${constants_1.PORT}/api/health`);
            console.log(`🎯 API Base: http://localhost:${constants_1.PORT}/api`);
            console.log(`🏠 Home: http://localhost:${constants_1.PORT}/`);
        });
        process.on("SIGTERM", () => {
            console.log("SIGTERM received - starting graceful shutdown");
            server.close(() => {
                console.log("Process terminated gracefully");
                process.exit(0);
            });
        });
        process.on("SIGINT", () => {
            console.log("SIGINT received - starting graceful shutdown");
            server.close(() => {
                console.log("Process terminated gracefully");
                process.exit(0);
            });
        });
    }
    catch (error) {
        console.error("❌ Failed to start server:", error.message);
        console.log("💡 Please run: npm run setup");
        process.exit(1);
    }
};
setTimeout(() => {
    startServer();
}, 1000);
//# sourceMappingURL=server.js.map