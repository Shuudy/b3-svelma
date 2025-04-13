import { getMovieDetails } from "$lib/api/tmdb";
import { json } from "@sveltejs/kit";

export async function GET({ params }) {
    const { id } = params;

    try {
        const data = await getMovieDetails(id);
        return json(data);
    } catch (error) {
        console.error(`Erreur lors de la récupération des détails du film ${id}:`, error);
        return json({ error: 'Film non trouvé' }, { status: 404 });
    }
}