"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = exports.testDatabaseConnection = void 0;
const prisma_config_1 = __importDefault(require("../../../prisma.config"));
exports.prisma = prisma_config_1.default;
const testDatabaseConnection = async () => {
    try {
        await prisma_config_1.default.$queryRaw `SELECT 1`;
        console.log(" Database connection test: SUCCESS");
        return true;
    }
    catch (error) {
        console.error("Database connection test: FAILED", error.message);
        return false;
    }
};
exports.testDatabaseConnection = testDatabaseConnection;
//# sourceMappingURL=database.js.map