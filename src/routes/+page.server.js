import { getPopularMovies, getUpcomingMovies, getMovieGenres } from "$lib/api/tmdb"

export async  function load() {
    try {
        const [popularMovies, upcomingMovies, genres] = await Promise.all([
            getPopularMovies(),
            getUpcomingMovies(),
            getMovieGenres()
        ]);

        return {
            popularMovies: popularMovies.results,
            upcomingMovies: upcomingMovies.results,
            genres: genres.genres
        };
    } catch (error) {
        console.error('Erreur lors du chargement de la page d\'accueil:', error);
        return {
            popularMovies: [],
            upcomingMovies: [],
            genres: []
        };
    }
}