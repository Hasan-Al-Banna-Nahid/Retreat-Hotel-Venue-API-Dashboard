import prisma from "../../../prisma.config";

export const testDatabaseConnection = async (): Promise<boolean> => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log(" Database connection test: SUCCESS");
    return true;
  } catch (error: any) {
    console.error("Database connection test: FAILED", error.message);
    return false;
  }
};

export { prisma };
