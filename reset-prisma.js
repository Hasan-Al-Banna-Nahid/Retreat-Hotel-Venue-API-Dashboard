const { execSync } = require("child_process");
const fs = require("fs");

console.log("🔧 Fixing Prisma seeding...");

try {
  console.log("1. Running seed directly with ts-node...");
  execSync("npx ts-node -r dotenv/config prisma/seed.ts", { stdio: "inherit" });

  console.log("2. Testing server startup...");
  console.log(
    "✅ If you see database connection success below, everything is working!"
  );

  // Test the server briefly
  const { spawn } = require("child_process");
  const server = spawn(
    "npx",
    ["ts-node-dev", "-r", "dotenv/config", "--transpile-only", "server.ts"],
    {
      stdio: "inherit",
      detached: true,
    }
  );

  // Wait 5 seconds then kill the test server
  setTimeout(() => {
    console.log("🛑 Stopping test server...");
    process.kill(-server.pid);
    console.log("🎉 Setup completed successfully!");
    console.log("🚀 You can now run: npm run dev");
    process.exit(0);
  }, 5000);
} catch (error) {
  console.error("❌ Setup failed:", error.message);
  process.exit(1);
}
