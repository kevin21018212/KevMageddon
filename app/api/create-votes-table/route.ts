import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const result = await sql`
        CREATE TABLE Votes (
          vote_id SERIAL PRIMARY KEY,
          user_id INT REFERENCES Users(user_id),
          event_id INT REFERENCES Events(event_id),
          movie_id INT REFERENCES Movies(movie_id),
          preferred_event_time TIMESTAMP
        );
      `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
