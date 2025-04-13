import { getMovieDetails } from "$lib/api/tmdb";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
    const { id } = params;
    
    try {
        const movie = await getMovieDetails(id);
        return { movie };
    } catch (err) {
        throw error(404, { message: 'Film non trouvé'});
    }
}