import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const createUsersTable = await sql`
      CREATE TABLE Users (
        user_id SERIAL PRIMARY KEY,
        google_account_id VARCHAR(255) UNIQUE,
        username VARCHAR(50)
      );
    `;

    const createEventsTable = await sql`
      CREATE TABLE Events (
        event_id SERIAL PRIMARY KEY,
        week_start_date DATE,
        event_time TIMESTAMP
      );
    `;

    const createMoviesTable = await sql`
      CREATE TABLE Movies (
        movie_id SERIAL PRIMARY KEY,
        movie_title VARCHAR(255)
      );
    `;

    const createVotesTable = await sql`
      CREATE TABLE Votes (
        vote_id SERIAL PRIMARY KEY,
        user_id INT REFERENCES Users(user_id),
        event_id INT REFERENCES Events(event_id),
        movie_id INT REFERENCES Movies(movie_id),
        preferred_event_time TIMESTAMP
      );
    `;

    return NextResponse.json(
      {
        createUsersTable,
        createEventsTable,
        createMoviesTable,
        createVotesTable,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
