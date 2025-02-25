import Image from "next/image";
import Link from "next/link";
import { Movie } from "../../typings";
import getImagePath from "@/lib/getImagePath";

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <Link href={`/movie/${movie.id}`} className="relative flex-shrink-0 cursor-pointer transform hover:scale-105 transition duration-200 ease-out hover:drop-shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-t from-gray-100/5 via-gray-200/5 to-gray-200/20 dark:to-[#1A1C29]/80 z-10" />
      <p className="absolute z-20 bottom-5 left-5 text-white font-semibold text-md">
        {movie.title}
      </p>

      <Image
        className="w-fit lg:min-w-[400px] h-56 object-cover object-center shadow-md shadow-gray-900 drop-shadow-xl rounded-sm"
        src={getImagePath(movie.backdrop_path || movie.poster_path)}
        alt={movie.title}
        width={1920}
        height={1080}
        key={movie.id}
      />
    </Link>
  );
};

export default MovieCard;

