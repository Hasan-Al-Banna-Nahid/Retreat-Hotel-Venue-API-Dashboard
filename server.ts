import dotenv from "dotenv";
// Load environment variables FIRST
dotenv.config();

console.log("🚀 Starting Hotel Venue API...");
console.log("🔧 Environment:", process.env.NODE_ENV);
console.log("🔧 Port:", process.env.PORT);

import { app } from "./app";
import { PORT, NODE_ENV } from "./src/app/config/constants";
import { testDatabaseConnection } from "./src/app/config/database";

const startServer = async () => {
  try {
    console.log("🔌 Testing database connection...");

    // Test database connection before starting server
    const dbConnected = await testDatabaseConnection();

    if (!dbConnected) {
      console.error("❌ Cannot start server without database connection");
      console.log("💡 Please check your DATABASE_URL in .env file");
      process.exit(1);
    }

    const server = app.listen(PORT, () => {
      console.log(`✅ Server running in ${NODE_ENV} mode on port ${PORT}`);
      console.log(`📊 Database: PostgreSQL on Railway`);
      console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
      console.log(`🎯 API Base: http://localhost:${PORT}/api`);
      console.log(`🏠 Home: http://localhost:${PORT}/`);
    });

    // Graceful shutdown
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
  } catch (error: any) {
    console.error("❌ Failed to start server:", error.message);
    console.log("💡 Please run: npm run setup");
    process.exit(1);
  }
};

// Delay start to ensure Prisma is ready
setTimeout(() => {
  startServer();
}, 1000);
