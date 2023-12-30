import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const result = await sql`
        CREATE TABLE Events (
          event_id SERIAL PRIMARY KEY,
          week_start_date DATE,
          event_time TIMESTAMP
        );
      `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
