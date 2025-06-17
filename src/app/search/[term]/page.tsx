import MoviesCarousel from "@/components/MoviesCarousel";
import { getPopularMovies, getSearchedMovies } from "@/lib/getMovies";
import { notFound } from "next/navigation";

type Props = {
  params: { term: string };
};

const SearchPage = async ({ params: { term } }: Props) => {
  if (!term) return notFound();

  const decodedTerm = decodeURIComponent(term);

  const movies = await getSearchedMovies(decodedTerm);
  const popularMovies = await getPopularMovies();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col space-y-4 mt-32 xl:mt-42">
        <h1 className="text-6xl font-bold px-10">Results for {decodedTerm}</h1>

        <MoviesCarousel title="Movies" movies={movies} isVertical />
        <MoviesCarousel title="You may also like" movies={popularMovies} />
      </div>
    </div>
  );
};

export default SearchPage;
