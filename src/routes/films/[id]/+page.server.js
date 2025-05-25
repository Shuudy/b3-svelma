import { getMovieDetails } from "$lib/api/tmdb";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
    const { id } = params;
    
    try {
        const movie = await getMovieDetails(id);

        //extraire les acteurs
        const actors = movie.credits.cast.map((actor) => ({
            id: actor.id,
            name: actor.name,
            role: actor.character,
            profile_path: actor.profile_path,
        }));

        return { movie, actors };
    } catch (err) {
        console.error("Erreur lors de la récupération des détails du film: ", err);
        throw error(404, { message: 'Film non trouvé'});
    }

    
}



