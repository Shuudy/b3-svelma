import { getPopularMovies } from "$lib/api/tmdb";
import { json } from "@sveltejs/kit";

export async function GET({ url }) {
    const page = url.searchParams.get('page') || 1;

    try {
        const data = await getPopularMovies(page);
        return json(data);
    } catch (error) {
        console.error('Erreur lors de la récupération des films populaires:', error);
        return json({ error: 'Erreur serveur' }, { status: 500 });
    }
}