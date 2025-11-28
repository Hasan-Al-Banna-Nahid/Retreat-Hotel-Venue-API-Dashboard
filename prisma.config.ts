import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

console.log("🔧 Environment Check:");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("DATABASE_URL available:", !!process.env.DATABASE_URL);

// Always use DATABASE_URL for both development and production
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL environment variable is required. Please check your .env file"
  );
}

// Mask password in logs for security
const maskedUrl = databaseUrl.replace(/:[^:]*@/, ":****@");
console.log("🔧 Using database:", maskedUrl);

// Initialize Prisma Client
let prisma: PrismaClient;

try {
  prisma = new PrismaClient({
    datasourceUrl: databaseUrl,
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

  console.log("✅ Prisma Client initialized successfully");
} catch (error: any) {
  console.error("❌ Failed to initialize Prisma Client:", error.message);
  console.log("💡 Please run: npx prisma generate");
  process.exit(1);
}

export default prisma!;
