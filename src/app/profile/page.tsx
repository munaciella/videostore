"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState, useCallback } from "react";
import { getSavedMovies, toggleWatchStatus } from "@/lib/firestore";
import MoviesCarousel from "@/components/MoviesCarousel";
import { Movie } from "../../../typings";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const [savedMovies, setSavedMovies] = useState<Movie[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sortOption, setSortOption] = useState("release_date");
  const [filterWatched, setFilterWatched] = useState<boolean | null>(null);

  const fetchMovies = useCallback(async () => {
    if (user) {
      const movies = await getSavedMovies(user.id);
      setSavedMovies(movies);
    }
  }, [user]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies, filterWatched]);

  const handleSort = (option: string) => {
    setSortOption(option);
    setSavedMovies((prev) =>
      [...prev].sort((a, b) => {
        if (option === "release_date")
          return (
            new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
          );
        if (option === "rating") return b.vote_average - a.vote_average;
        return 0;
      })
    );
  };

  const handleToggleWatched = async (movieId: string, watched: boolean) => {
    if (!user) return;
    await toggleWatchStatus(user.id, movieId, !watched);
    fetchMovies();
  };

  const handleRemoveMovie = (movieId: string) => {
    setSavedMovies((prevMovies) =>
      prevMovies.filter((movie) => String(movie.id) !== movieId)
    );
  };

  if (!isLoaded) return <p className="text-center mt-28 text-xl">Loading...</p>;
  if (!user)
    return (
      <p className="text-center mt-28 text-xl">
        You must be signed in to view this page.
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-14 mt-32">
      <div className="flex flex-col space-y-6">
        <div className="p-6 border rounded-lg shadow-lg bg-gray-100 dark:bg-gray-800">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Welcome, {user.firstName}!
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            <strong>Name:</strong> {user.firstName} {user.lastName}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Email:</strong> {user.primaryEmailAddress?.emailAddress}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-shrink-0">
            <Select onValueChange={handleSort}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="release_date">Release Date</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="outline"
            onClick={() =>
              setFilterWatched((prev) =>
                prev === null ? true : prev === true ? false : null
              )
            }
          >
            {filterWatched === null ? "All" : filterWatched ? "Watched" : "In Progress"}
          </Button>
        </div>

        <div className="mt-6">
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Your Watchlist
          </h2>
          {savedMovies.length > 0 ? (
            <MoviesCarousel
              title="Saved Movies"
              movies={savedMovies.filter(
                (movie) =>
                  filterWatched === null || movie.watched === filterWatched
              )}
              isVertical
              onRemove={handleRemoveMovie}
              onToggleWatched={handleToggleWatched}
            />
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              You haven&apos;t saved any movies yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
