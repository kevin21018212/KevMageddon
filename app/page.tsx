"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Users, db } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

const Home = () => {
  const { data: session } = useSession() as { data: any };

  const handleSignClick = async () => {
    if (session && session.user) {
      await signOut();
    } else {
      await signIn("google", { callbackUrl: "/" });
    }
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {!session ? (
        <div>
          <p>Please log in to access additional features.</p>
          <button onClick={handleSignClick}>
            {session && session.user ? "Sign Out" : "Sign In"}
          </button>
        </div>
      ) : (
        <div>
          <p>Hello, {session.user.name}!</p>
          {/* Add other content for logged-in users */}
        </div>
      )}
    </div>
  );
};

export default Home;
