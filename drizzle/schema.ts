import { Pool } from "pg";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { drizzle } from "drizzle-orm/node-postgres";
import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";

require("dotenv").config({ path: ".env.development.local" });

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

export const db = drizzle(pool);

export const main = async () => {
  await migrate(db, { migrationsFolder: "drizzle/migrations" });
  process.exit(0);
};

main().catch((err) => {
  console.error(err);
});

export const Users = pgTable("Users", {
  user_id: serial("user_id").primaryKey(),
  username: text("username"),
  google_account_id: text("google_account_id"),
});

export const Events = pgTable("Events", {
  event_id: serial("event_id").primaryKey(),
  event_time: text("event_time"),
  description: text("description"), // Added description field
  url: text("url"), // Added url field
  imagepath: text("imagepath"), // Added imagepath field
  location: text("location"), // Added location field
  week: text("week"), // Added week field
});

export const Movies = pgTable("Movies", {
  movie_id: serial("movie_id").primaryKey(),
  movie_title: text("movie_title"),
  url: text("url"), // Added url field
  week: text("week"), // Added week field
});

export const Votes = pgTable("Votes", {
  vote_id: serial("vote_id").primaryKey(),
  user_id: integer("user_id").references(() => Users.user_id),
  event_id: integer("event_id").references(() => Events.event_id),
  movie_id: integer("movie_id").references(() => Movies.movie_id),
  preferred_event_time: text("preferred_event_time"),
});
