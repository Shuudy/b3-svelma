// Service d'API pour TMDB

const TMDB_API_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
// Langue par défaut pour les requêtes
const DEFAULT_LANGUAGE = 'fr-FR';


// Fonction pour faire des requetes à l'api TMDB
async function fetchFromTMDB(endpoint, params = {}) {
    // vérifier si la clé est définie
    if (!API_KEY) {
        console.error('La clé TMDB n\'est pas définie');
        throw new Error('Clé API TMDB manquante');
    }


    const url = new URL(`${TMDB_API_URL}${endpoint}`);

    // Ajout des Paramètres par defaut
    url.searchParams.append('api_key', API_KEY);
    url.searchParams.append('language', DEFAULT_LANGUAGE);

    // Paramètres supplementaires
    for (const [key, value] of Object.entries(params)) {
        url.searchParams.append(key, value);
    }

    try {
        //Déclarer la variable response avant de l'utiliser
        const response = await fetch(url);

        if(!response.ok) {
            console.error(`Erreur API: ${response.status} ${response.statusText}`);
            throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error lors de la requête TMDB: ', error);
        throw error;
    }
}

// Rechercher des films
export async function searchMovies(query, page = 1) {
    return fetchFromTMDB('/search/movie', { query, page });
}

// Obtenir les details d'un film
export async function getMovieDetails(movieId) {
    return fetchFromTMDB(`/movie/${movieId}`, { append_to_response: "credits" });
}

//Obtenir les films populaires
export async function getPopularMovies(page = 1) {
    return fetchFromTMDB('/movie/popular', { page });
}

//Obtenir les films à venir
export async function getUpcomingMovies(page = 1) {
    return fetchFromTMDB('/movie/upcoming', { page });
}

//Obtenir les détails d'un acteur/realisateur etc
export async function getPersonDetails(personId) {
    return fetchFromTMDB(`/person/${personId}`, { append_to_response: 'movie_credits' });
}

//Obtenir les genres de films
export async function getMovieGenres() {
    return fetchFromTMDB('/genre/movie/list');
}

// Découvrir des films avec les filtres
export async function discoverMovies(params = {}) {
    return fetchFromTMDB('/discover/movie', params);
}