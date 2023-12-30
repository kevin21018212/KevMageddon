import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { sql } from "@vercel/postgres";
import { Profile } from "next-auth";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({
      user,
      account,
      profile,
    }: {
      user: any;
      account: any;
      profile?: Profile;
    }) {
      if (profile && "sub" in profile && "name" in profile) {
        const { sub: googleAccountId, name: username } = profile;

        try {
          if (!user) {
            // User doesn't exist, create a new record
            await sql`
              INSERT INTO Users (google_account_id, username) 
              VALUES (${googleAccountId}, ${username});
            `;
          }
        } catch (error) {
          console.error("Error during user creation:", error);
        }
      }

      return true; // Return true to allow sign-in
    },
  },
});

export { handler as GET, handler as POST };
