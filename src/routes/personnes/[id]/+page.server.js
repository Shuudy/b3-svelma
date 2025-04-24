import { getPersonDetails } from "$lib/api/tmdb";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
    const { id } = params;

    try {
        const person = await getPersonDetails(id);
        return { person };
    } catch (err) {
        console.error(`Erreur lors de la récupération des détails de la personne ${id}:`, err)
        throw error(404, { message: 'Personne non trouvée' });
    }
}