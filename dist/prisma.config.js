"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log("🔧 Environment Check:");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("DATABASE_URL available:", !!process.env.DATABASE_URL);
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is required. Please check your .env file");
}
const maskedUrl = databaseUrl.replace(/:[^:]*@/, ":****@");
console.log("🔧 Using database:", maskedUrl);
let prisma;
try {
    prisma = new client_1.PrismaClient({
        datasourceUrl: databaseUrl,
        log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
    });
    console.log("✅ Prisma Client initialized successfully");
}
catch (error) {
    console.error("❌ Failed to initialize Prisma Client:", error.message);
    console.log("💡 Please run: npx prisma generate");
    process.exit(1);
}
exports.default = prisma;
//# sourceMappingURL=prisma.config.js.map