import type { Config } from "drizzle-kit";
require("dotenv").config({ path: ".env.development.local" });

export default {
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DB_URL + "?sslmode=require",
  },
} satisfies Config;
