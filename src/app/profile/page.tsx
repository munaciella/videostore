// "use client";

// import { useUser } from "@clerk/nextjs";
// import { useEffect, useState, useCallback } from "react";
// import { getSavedMovies, toggleWatchStatus } from "@/lib/firestore";
// import MoviesCarousel from "@/components/MoviesCarousel";
// import { Movie } from "../../../typings";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";

// export default function ProfilePage() {
//   const { user, isLoaded } = useUser();
//   const [savedMovies, setSavedMovies] = useState<Movie[]>([]);
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [sortOption, setSortOption] = useState("release_date");
//   const [filterWatched, setFilterWatched] = useState<boolean | null>(null);

//   // ✅ Fetch movies every time the filter changes
//   const fetchMovies = useCallback(async () => {
//     if (user) {
//       const movies = await getSavedMovies(user.id);
//       setSavedMovies(movies);
//     }
//   }, [user]);

//   useEffect(() => {
//     fetchMovies();
//   }, [fetchMovies, filterWatched]); // ✅ Ensure movies update when filter changes

//   // ✅ Sorting Function
//   const handleSort = (option: string) => {
//     setSortOption(option);
//     setSavedMovies((prev) =>
//       [...prev].sort((a, b) => {
//         if (option === "release_date")
//           return (
//             new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
//           );
//         if (option === "rating") return b.vote_average - a.vote_average;
//         return 0;
//       })
//     );
//   };

//   // ✅ Toggle Watched Status & Refetch
//   const handleToggleWatched = async (movieId: string, watched: boolean) => {
//     if (!user) return;
//     await toggleWatchStatus(user.id, movieId, !watched);
//     fetchMovies(); // ✅ Ensure instant update
//   };

//   // ✅ Remove Movie & Re-render Instantly
//   const handleRemoveMovie = (movieId: string) => {
//     setSavedMovies((prevMovies) =>
//       prevMovies.filter((movie) => String(movie.id) !== movieId)
//     );
//   };

//   if (!isLoaded) return <p className="text-center mt-28 text-xl">Loading...</p>;
//   if (!user)
//     return (
//       <p className="text-center mt-28 text-xl">
//         You must be signed in to view this page.
//       </p>
//     );

//   return (
//     <div className="max-w-7xl mx-auto">
//       <div className="flex flex-col space-y-4 mt-32 xl:mt-42 px-10">
//         <h1 className="text-6xl font-bold">Welcome, {user.firstName}!</h1>

//         {/* User Info */}
//         <div className="p-5 border rounded-lg shadow-lg bg-gray-100 dark:bg-gray-800">
//           <p>
//             <strong>Name:</strong> {user.firstName} {user.lastName}
//           </p>
//           <p>
//             <strong>Email:</strong> {user.primaryEmailAddress?.emailAddress}
//           </p>
//         </div>

//         {/* Sorting & Filtering */}
//         <div className="flex items-center space-x-4">
//           {/* Sort Dropdown */}
//           <Select onValueChange={handleSort}>
//             <SelectTrigger className="w-[180px]">
//               <SelectValue placeholder="Sort by" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="release_date">Release Date</SelectItem>
//               <SelectItem value="rating">Rating</SelectItem>
//             </SelectContent>
//           </Select>

//           {/* Watchlist Filter */}
//           <Button
//             variant="outline"
//             onClick={() =>
//               setFilterWatched((prev) =>
//                 prev === null ? true : prev === true ? false : null
//               )
//             }
//           >
//             {filterWatched === null ? "All" : filterWatched ? "Watched" : "In Progress"}
//           </Button>
//         </div>

//         {/* Saved Movies */}
//         <h2 className="text-3xl font-bold mt-10">Your Watchlist</h2>
//         {savedMovies.length > 0 ? (
//           <MoviesCarousel
//             title="Saved Movies"
//             movies={savedMovies.filter(
//               (movie) =>
//                 filterWatched === null || movie.watched === filterWatched
//             )}
//             isVertical
//             onRemove={handleRemoveMovie}
//             onToggleWatched={handleToggleWatched}
//           />
//         ) : (
//           <p className="text-gray-500 dark:text-gray-400">
//             You haven&apos;t saved any movies yet.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

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

  // ✅ Fetch movies every time the filter changes
  const fetchMovies = useCallback(async () => {
    if (user) {
      const movies = await getSavedMovies(user.id);
      setSavedMovies(movies);
    }
  }, [user]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies, filterWatched]); // ✅ Ensure movies update when filter changes

  // ✅ Sorting Function
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

  // ✅ Toggle Watched Status & Refetch
  const handleToggleWatched = async (movieId: string, watched: boolean) => {
    if (!user) return;
    await toggleWatchStatus(user.id, movieId, !watched);
    fetchMovies(); // ✅ Ensure instant update
  };

  // ✅ Remove Movie & Re-render Instantly
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
        {/* User Info */}
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

        {/* Sorting & Filtering */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Sort Dropdown */}
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

          {/* Watchlist Filter */}
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

        {/* Saved Movies */}
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
