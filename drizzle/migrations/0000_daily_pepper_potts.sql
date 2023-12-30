CREATE TABLE IF NOT EXISTS "Events" (
	"event_id" serial PRIMARY KEY NOT NULL,
	"week_start_date" text,
	"event_time" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Movies" (
	"movie_id" serial PRIMARY KEY NOT NULL,
	"movie_title" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Users" (
	"user_id" serial PRIMARY KEY NOT NULL,
	"username" text,
	"google_account_id" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Votes" (
	"vote_id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"event_id" integer,
	"movie_id" integer,
	"preferred_event_time" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Votes" ADD CONSTRAINT "Votes_user_id_Users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Votes" ADD CONSTRAINT "Votes_event_id_Events_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "Events"("event_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Votes" ADD CONSTRAINT "Votes_movie_id_Movies_movie_id_fk" FOREIGN KEY ("movie_id") REFERENCES "Movies"("movie_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
