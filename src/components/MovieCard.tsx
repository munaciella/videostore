// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { Movie } from '../../typings';
// import getImagePath from '@/lib/getImagePath';
// import { useUser } from '@clerk/nextjs';
// import { useState, useEffect } from 'react';
// import { saveMovie, removeMovie, isMovieSaved } from '@/lib/firestore';
// import { toast } from 'sonner';
// import { Button } from './ui/button';

// const MovieCard = ({
//   movie,
//   onRemove,
// }: {
//   movie: Movie;
//   onRemove?: (id: string) => void;
// }) => {
//   const { user } = useUser();
//   const [saved, setSaved] = useState(false);
//   const movieId = String(movie.id);

//   useEffect(() => {
//     if (user) {
//       isMovieSaved(user.id, movieId).then(setSaved);
//     }
//   }, [user, movieId]);

//   // ✅ Handle Save/Remove Movie
//   const handleSaveMovie = async (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation(); // ✅ Prevents interfering with navigation

//     if (!user) {
//       toast.error('You must be signed in to save movies!');
//       return;
//     }

//     if (saved) {
//       await removeMovie(user.id, movieId);
//       setSaved(false);
//       toast.info(`Removed "${movie.title}" from My List`, { duration: 3000 });

//       if (onRemove) onRemove(movieId);
//     } else {
//       await saveMovie(user.id, { ...movie, id: Number(movieId) });
//       setSaved(true);
//       toast.success(`Saved "${movie.title}" to My List!`, { duration: 3000 });
//     }
//   };

//   return (
//     <div className="relative flex-shrink-0 cursor-pointer transform hover:scale-105 transition duration-200 ease-out hover:drop-shadow-lg">
//       <Link href={`/movie/${movieId}`} className="block w-full h-full">
//         {/* Overlay for Text Visibility */}
//         <div className="absolute inset-0 bg-gradient-to-t from-gray-100/5 via-gray-200/5 to-gray-200/20 dark:to-[#1A1C29]/80 z-10" />

//         {/* Movie Title */}
//         <p className="absolute z-20 bottom-5 left-5 text-white font-semibold text-md">
//           {movie.title}
//         </p>

//         {/* Movie Image */}
//         <Image
//           className="w-fit lg:min-w-[400px] h-56 object-cover object-center shadow-md shadow-gray-900 drop-shadow-xl rounded-sm"
//           src={getImagePath(movie.backdrop_path || movie.poster_path)}
//           alt={movie.title}
//           width={1920}
//           height={1080}
//           key={movie.id}
//         />
//       </Link>

//       {/* ✅ Move Save/Remove Button OUTSIDE <Link> */}
//       <Button
//         variant="destructive"
//         onClick={handleSaveMovie}
//         className="absolute top-3 right-3 bg-black/50 text-white text-xs px-3 py-1 rounded-md backdrop-blur-sm z-30 hover:bg-black/70 transition"
//       >
//         {saved ? 'Remove' : 'Save to My List'}
//       </Button>
//     </div>
//   );
// };

// export default MovieCard;

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '../../typings';
import getImagePath from '@/lib/getImagePath';
import { useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import { saveMovie, removeMovie, isMovieSaved, getWatchStatus, toggleWatchStatus } from '@/lib/firestore';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { CheckCircle, Clock } from 'lucide-react';

const MovieCard = ({
  movie,
  onRemove,
  onToggleWatched,
}: {
  movie: Movie;
  onRemove?: (id: string) => void;
  onToggleWatched?: (id: string, watched: boolean) => void;
}) => {
  const { user } = useUser();
  const [saved, setSaved] = useState(false);
  const [watched, setWatched] = useState(false);
  const movieId = String(movie.id);

  useEffect(() => {
    if (user) {
      isMovieSaved(user.id, movieId).then(setSaved);
      getWatchStatus(user.id, movieId).then((status) => {
        if (status !== null) {
          setWatched(status);
        }
      });
    }
  }, [user, movieId]);

  // ✅ Handle Save/Remove Movie
  const handleSaveMovie = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // ✅ Prevents interfering with navigation

    if (!user) {
      toast.error('You must be signed in to save movies!');
      return;
    }

    if (saved) {
      await removeMovie(user.id, movieId);
      setSaved(false);
      setWatched(false); // ✅ Reset watch status when removing
      toast.info(`Removed "${movie.title}" from My List`, { duration: 3000 });

      if (onRemove) onRemove(movieId);
    } else {
      await saveMovie(user.id, { ...movie, id: Number(movieId), watched: false });
      setSaved(true);
      setWatched(false); // ✅ Default to 'In Progress' when saved
      toast.success(`Saved "${movie.title}" to My List!`, { duration: 3000 });
    }
  };

  // ✅ Toggle Watched Status
  const handleToggleWatched = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) return;

    const newStatus = !watched;
    await toggleWatchStatus(user.id, movieId, newStatus);
    setWatched(newStatus);
    toast.success(`Marked "${movie.title}" as ${newStatus ? 'Watched' : 'In Progress'}`);

    if (onToggleWatched) onToggleWatched(movieId, newStatus);
  };

  return (
    <div className="relative flex-shrink-0 cursor-pointer transform hover:scale-105 transition duration-200 ease-out hover:drop-shadow-lg">
      <Link href={`/movie/${movieId}`} className="block w-full h-full">
        {/* Overlay for Text Visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-100/5 via-gray-200/5 to-gray-200/20 dark:to-[#1A1C29]/80 z-10" />

        {/* Movie Title */}
        <p className="absolute z-20 bottom-5 left-5 text-white font-semibold text-md">
          {movie.title}
        </p>

        {/* Movie Image */}
        <Image
          className="w-fit lg:min-w-[400px] h-56 object-cover object-center shadow-md shadow-gray-900 drop-shadow-xl rounded-sm"
          src={getImagePath(movie.backdrop_path || movie.poster_path)}
          alt={movie.title}
          width={1920}
          height={1080}
          key={movie.id}
        />
      </Link>

      {/* ✅ Watch Status Toggle (Watched/In Progress) */}
      {saved && (
        <Button
          onClick={handleToggleWatched}
          className={`absolute bottom-3 right-3 flex items-center space-x-2 text-white text-xs px-3 py-1 rounded-md backdrop-blur-sm z-30 transition ${
            watched ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500 hover:bg-yellow-600'
          }`}
        >
          {watched ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
          {watched ? 'Watched' : 'In Progress'}
        </Button>
      )}

      {/* ✅ Save/Remove Button */}
      <Button
        onClick={handleSaveMovie}
        className={`absolute top-3 right-3 text-white text-xs px-3 py-1 rounded-md backdrop-blur-sm z-30 transition ${
          saved ? 'bg-red-500 hover:bg-red-600' : 'bg-black/50 hover:bg-black/70'
        }`}
      >
        {saved ? 'Remove' : 'Save to My List'}
      </Button>
    </div>
  );
};

export default MovieCard;