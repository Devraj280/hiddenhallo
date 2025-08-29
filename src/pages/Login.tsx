"use client"; // if you're using Next.js App Router

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// 🔑 Supabase client
const supabase = createClient(
  "https://rjnmnzcawzvqgmldrwvg.supabase.co", // your Supabase project URL
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqbm1uemNhd3p2cWdtbGRyd3ZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwODczOTgsImV4cCI6MjA3MDY2MzM5OH0.5ge3xaPpGmdPdIU4kzf_0m9i3dc23pXBq0nWzYmdGjk" // ⚠️ replace with your anon key from Supabase settings
);

export default function Login() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Check if already logged in and handle auth callback
  useEffect(() => {
    const getUser = async () => {
      try {
        // Handle auth callback if present
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Session error:", error);
        }
        
        setUser(data.session?.user ?? null);
      } catch (error) {
        console.error("Auth check error:", error);
      } finally {
        setLoading(false);
      }
    };

    getUser();

    // Listen for auth changes (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session?.user?.email);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // ✅ Sign in with Google - Works for both localhost and production
  const signInWithGoogle = async () => {
    try {
      // Automatically detect the current environment
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://hiddenhallo.shop';
      
      console.log('Redirecting to:', `${baseUrl}/auth/callback`);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${baseUrl}/auth/callback`, // Works for both localhost and production
        },
      });

      if (error) {
        console.error("Login error:", error.message);
        alert("Login failed: " + error.message);
      }
    } catch (error) {
      console.error("Unexpected login error:", error);
    }
  };

  // ✅ Logout
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Logout error:", error);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Unexpected logout error:", error);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-6">
      {!user ? (
        <>
          <h1 className="text-2xl font-bold">Login to HiddenHallo</h1>
          <button
            onClick={signInWithGoogle}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Sign in with Google
          </button>
        </>
      ) : (
        <>
          <h1 className="text-xl font-semibold">
            Welcome, {user.user_metadata?.full_name || user.email} 👋
          </h1>
          {user.user_metadata?.avatar_url && (
            <img
              src={user.user_metadata.avatar_url}
              alt="avatar"
              className="w-16 h-16 rounded-full"
            />
          )}
          <p className="text-gray-600">Email: {user.email}</p>
          <button
            onClick={signOut}
            className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition"
          >
            Sign out
          </button>
        </>
      )}
    </div>
  );
}