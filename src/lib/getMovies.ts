/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck


import { MovieDetails, SearchResults, StreamingProvider } from "../../typings";

async function fetchFromTMDB(url: URL, cacheTime?: number) {
    url.searchParams.set("include_adult", "false");
    url.searchParams.set("include_video", "false");
    url.searchParams.set("sort_by", "popularity.desc");
    url.searchParams.set("language", "en-US");
    url.searchParams.set("page", "1");

    const options: RequestInit = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
        next: {
            revalidate: cacheTime || 60 * 60 * 24,
        },
    };

    const response = await fetch(url.toString(), options);
    const data = (await response.json()) as SearchResults;

    return data;
    
}

export async function getUpcomingMovies() {
    const url = new URL("https://api.themoviedb.org/3/movie/upcoming");
    const data = await fetchFromTMDB(url);

    return data.results;
}

export async function getTopRatedMovies() {
    const url = new URL("https://api.themoviedb.org/3/movie/top_rated");
    const data = await fetchFromTMDB(url);

    return data.results;
}

export async function getPopularMovies() {
    const url = new URL("https://api.themoviedb.org/3/movie/popular");
    const data = await fetchFromTMDB(url);

    return data.results;
}

export async function getDiscoverMovies(id?: string, keywords?: string) {
    const url = new URL(`https://api.themoviedb.org/3/discover/movie`);
    
    if (keywords) {
        url.searchParams.set("with_keywords", keywords);
    }

    if (id) {
        url.searchParams.set("with_genres", id);
    }

    const data = await fetchFromTMDB(url);
    return data.results;
}

export async function getSearchedMovies(term: string) {
    const url = new URL(`https://api.themoviedb.org/3/search/movie`);

    url.searchParams.set("query", term);

    const data = await fetchFromTMDB(url);
    return data.results;
}

export async function getMovieRecommendations(movieId: string) {
    const url = new URL(`https://api.themoviedb.org/3/movie/${movieId}/recommendations`);
    const data = await fetchFromTMDB(url);
    return data.results;
}

export async function getSimilarMovies(movieId: string) {
    const url = new URL(`https://api.themoviedb.org/3/movie/${movieId}/similar`);
    const data = await fetchFromTMDB(url);
    return data.results;
}

export async function getSearchBasedRecommendations(searchTerm: string) {
    const searchedMovies = await getSearchedMovies(searchTerm);
    if (searchedMovies.length === 0) return [];
    
    const firstMovieId = String(searchedMovies[0].id);
    return getMovieRecommendations(firstMovieId);
}


export async function getMovieDetails(movieId: string): Promise<MovieDetails | null> {
    const url = new URL(`https://api.themoviedb.org/3/movie/${movieId}`);
    const data = await fetchFromTMDB(url);

    if (!data || !data.id) return null; // ✅ Ensure it returns `null` if data is invalid

    return data as MovieDetails;
}

export async function getStreamingProviders(movieId: string): Promise<StreamingProvider[]> {
    const url = new URL(`https://api.themoviedb.org/3/movie/${movieId}/watch/providers`);
    const data = await fetchFromTMDB(url);

    return data.results?.GB?.flatrate || [];
}