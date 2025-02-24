// import CarouselBannerWrapper from "@/components/CarouselBannerWrapper";
// import MoviesCarousel from "@/components/MoviesCarousel";
// import { getPopularMovies, getTopRatedMovies, getUpcomingMovies } from "@/lib/getMovies";

// export default async function Home() {

//   const upcomingMovies = await getUpcomingMovies();
//   const topRatedMovies = await getTopRatedMovies();
//   const popularMovies = await getPopularMovies();

//   return (
//       <main>
//         <CarouselBannerWrapper />

//         <div className="flex flex-col space-y-2 mt-6">
//           <MoviesCarousel movies={upcomingMovies} title="Upcoming" />
//           <MoviesCarousel movies={topRatedMovies} title="Top Rated" />
//           <MoviesCarousel movies={popularMovies} title="Popular" />
//         </div>
//     </main>
//   );
// }

import CarouselBannerWrapper from "@/components/CarouselBannerWrapper";
import MoviesCarousel from "@/components/MoviesCarousel";
import { 
  getPopularMovies, 
  getTopRatedMovies, 
  getUpcomingMovies, 
  getMovieRecommendations, 
  getSimilarMovies 
} from "@/lib/getMovies";
import { Movie } from "../../typings"; // ✅ Ensure correct type import

export default async function Home() {
  const upcomingMovies: Movie[] = await getUpcomingMovies();
  const topRatedMovies: Movie[] = await getTopRatedMovies();
  const popularMovies: Movie[] = await getPopularMovies();

  // ✅ Pick a random popular movie for recommendations (convert to string)
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

        {/* ✅ AI-Powered Movie Recommendations */}
        {recommendedMovies.length > 0 && (
          <MoviesCarousel movies={recommendedMovies} title="Recommended for You" />
        )}

        {/* ✅ Similar Movies Section */}
        {similarMovies.length > 0 && (
          <MoviesCarousel movies={similarMovies} title="You May Also Like" />
        )}
      </div>
    </main>
  );
}

