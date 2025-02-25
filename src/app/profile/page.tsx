"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
//import { getSavedMovies } from "@/lib/firestore";
import MoviesCarousel from "@/components/MoviesCarousel";

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const [savedMovies, setSavedMovies] = useState<any[]>([]);

//   useEffect(() => {
//     if (user) {
//       getSavedMovies(user.id).then(setSavedMovies);
//     }
//   }, [user]);

  if (!isLoaded) return <p className="text-center mt-20 text-xl">Loading...</p>;
  if (!user) return <p className="text-center mt-20 text-xl">You must be signed in to view this page.</p>;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col space-y-4 mt-32 xl:mt-42 px-10">
        {/* Profile Header */}
        <h1 className="text-6xl font-bold">Welcome, {user.firstName}!</h1>

        {/* User Details */}
        <div className="p-5 border rounded-lg shadow-lg bg-gray-100 dark:bg-gray-800">
          <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
          <p><strong>Email:</strong> {user.primaryEmailAddress?.emailAddress}</p>
        </div>

        {/* Saved Movies */}
        <h2 className="text-3xl font-bold mt-10">Your Favorites</h2>
        {savedMovies.length > 0 ? (
          <MoviesCarousel title="Saved Movies" movies={savedMovies} isVertical />
        ) : (
          <p className="text-gray-500 dark:text-gray-400">You haven&apos;t saved any movies yet.</p>
        )}
      </div>
    </div>
  );
}