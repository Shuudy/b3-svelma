import { discoverMovies, getMovieGenres, searchMovies } from "$lib/api/tmdb";

export async function load({ url }) {
    const query = url.searchParams.get('q');
    const page = parseInt(url.searchParams.get('page') || '1');
    const genreId = url.searchParams.get('genre');
    const sortBy = url.searchParams.get('sort_by') || 'popularity.desc';

    try {
        // Récuperer les genres pour les filtres
        const genresResponse = await getMovieGenres();

        // Si une recherche est effectuée
        if (query) {
            const searchResults = await searchMovies(query, page);
            return {
                movies: searchResults.results,
                totalPages: searchResults.total_pages,
                totalResults: searchResults.total_results,
                currentPage: page,
                genres: genresResponse.genres,
                query
            };
        }
        //Sinon, utiliser discover avec filtres
        else {
            const params = {
                page,
                sort_by: sortBy
            };

            if (genreId) {
                params.with_genres = genreId;
            }

            const discoverResults = await discoverMovies(params);
            return {
                movies: discoverResults.results,
                totalPages: discoverResults.total_pages,
                totalResults: discoverResults.total_results,
                currentPage: page,
                genres: genresResponse.genres,
                genreId,
                sortBy
            };
        } 
    } catch (error) {
        console.error('Erreur lors du chargement de la page de recherche:', error);
        return {
            movies: [],
            totalPages: 0,
            totalResults: 0,
            currentPage: page,
            genres: [],
            error: 'Erreur lors de la recherche'
        };
    }
}