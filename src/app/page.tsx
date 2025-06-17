import CarouselBannerWrapper from "@/components/CarouselBannerWrapper";
import MoviesCarousel from "@/components/MoviesCarousel";
import { 
  getPopularMovies, 
  getTopRatedMovies, 
  getUpcomingMovies, 
  getMovieRecommendations, 
  getSimilarMovies 
} from "@/lib/getMovies";
import { Movie } from "../../typings";

export default async function Home() {
  const upcomingMovies: Movie[] = await getUpcomingMovies();
  const topRatedMovies: Movie[] = await getTopRatedMovies();
  const popularMovies: Movie[] = await getPopularMovies();

  const featuredMovieId: string | null = 
    popularMovies.length > 0 ? String(popularMovies[0].id) : null;

  let recommendedMovies: Movie[] = [];
  let similarMovies: Movie[] = [];

  if (featuredMovieId) {
    recommendedMovies = await getMovieRecommendations(featuredMovieId);
    similarMovies = await getSimilarMovies(featuredMovieId);
  }

  return (
    <main>
      <CarouselBannerWrapper />

      <div className="flex flex-col space-y-2 mt-6">
        <MoviesCarousel movies={upcomingMovies} title="Upcoming" />
        <MoviesCarousel movies={topRatedMovies} title="Top Rated" />
        <MoviesCarousel movies={popularMovies} title="Popular" />

        {recommendedMovies.length > 0 && (
          <MoviesCarousel movies={recommendedMovies} title="Recommended for You" />
        )}

        {similarMovies.length > 0 && (
          <MoviesCarousel movies={similarMovies} title="You May Also Like" />
        )}
      </div>
    </main>
  );
}

