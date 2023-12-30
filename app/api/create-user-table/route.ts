import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const result = await sql`
        CREATE TABLE Users (
          user_id SERIAL PRIMARY KEY,
          google_account_id VARCHAR(255) UNIQUE,
          username VARCHAR(50)
        );
      `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
