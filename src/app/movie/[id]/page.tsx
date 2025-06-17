import {
  getMovieDetails,
  getMovieRecommendations,
  getMovieTrailer,
  getSimilarMovies,
  getStreamingProviders,
} from '@/lib/getMovies';
import MoviesCarousel from '@/components/MoviesCarousel';
import Image from 'next/image';
import getImagePath from '@/lib/getImagePath';
import { notFound } from 'next/navigation';
import { Movie, MovieDetails, StreamingProvider } from '../../../../typings';
import TrailerModal from '@/components/TrailerModal';

type Props = {
  params: { id: string };
};

export default async function MoviePage({ params }: Props) {
  console.log('Fetching movie details for ID:', params.id);
  const movie: MovieDetails | null = await getMovieDetails(params.id);
  if (!movie) {
    console.error('❌ Movie not found for ID:', params.id);
    return notFound();
  }
  const recommendedMovies: Movie[] = await getMovieRecommendations(params.id);
  const similarMovies: Movie[] = await getSimilarMovies(params.id);

  const trailerUrl = await getMovieTrailer(params.id);

  const streamingProviders: StreamingProvider[] = await getStreamingProviders(
    params.id
  );

  const movieImage = movie.backdrop_path || movie.poster_path || '';

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col space-y-4 mt-32 xl:mt-42">
        <h1 className="text-6xl font-bold px-10">{movie.title}</h1>

        <div className="w-full px-4 sm:px-6 md:px-10">
          {movieImage ? (
            <Image
              src={getImagePath(movieImage, true)}
              alt={movie.title}
              width={1920}
              height={1080}
              className="w-full h-auto rounded-lg shadow-lg"
              priority
            />
          ) : (
            <p className="text-center text-gray-500">No image available</p>
          )}
        </div>

        {trailerUrl && (
          <div className="px-10">
            <TrailerModal trailerUrl={trailerUrl} />
          </div>
        )}

        {movie.overview && (
          <p className="text-lg text-gray-700 dark:text-gray-300 px-10">
            {movie.overview}
          </p>
        )}

        <div className="text-sm text-gray-500 px-10">
          {movie.release_date && (
            <p>
              <strong>Release Date:</strong> {movie.release_date}
            </p>
          )}
          <p>
            <strong>Rating:</strong> {movie.vote_average.toFixed(1)}/10
          </p>
          {movie.genres && movie.genres.length > 0 && (
            <p>
              <strong>Genres:</strong>{' '}
              {movie.genres.map((g) => g.name).join(', ')}
            </p>
          )}
        </div>

{streamingProviders.length > 0 && movie.id && (
  <div className="px-10">
    <h2 className="text-2xl font-bold mt-6">Available on:</h2>
    <div className="flex flex-col gap-4 mt-3">
      {streamingProviders.map((provider) => {
        const providerUrl = `https://www.themoviedb.org/movie/${movie.id}/watch`;

        return (
          <a
            key={provider.provider_id}
            href={providerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:opacity-80 transition"
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500${provider.logo_path}`}
              alt={provider.provider_name}
              width={50}
              height={50}
              className="rounded-md shadow-md"
            />
            <p className="text-blue-500 underline">{provider.provider_name}</p>
          </a>
        );
      })}
    </div>
  </div>
)}

        {recommendedMovies.length > 0 && (
          <MoviesCarousel
            title="Recommended for You"
            movies={recommendedMovies}
          />
        )}

        {similarMovies.length > 0 && (
          <MoviesCarousel title="You may also like" movies={similarMovies} />
        )}
      </div>
    </div>
  );
}
