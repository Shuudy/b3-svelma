import { searchMovies } from "$lib/api/tmdb";
import { error, json } from "@sveltejs/kit";

export async function GET({ url }) {
    const query = url.searchParams.get('query');
    const page = url.searchParams.get('page') || 1;

    if(!query) {
        return json({ error: 'Le parametre query est requis'}, { status: 400 })
    }

    try {
        const data = await searchMovies(query, page);
        return json(data)
    } catch (error) {
        console.error('Erreur lors de la recherche de films:', error);
        return json({ error: 'Erreur lors de la recherche de films' }, { status: 500 });
    }
}