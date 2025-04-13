import { getPersonDetails } from "$lib/api/tmdb";

export async function GET({ params }) {
    const { id } = params;

    try {
        const data = await getPersonDetails(id);
        return json(data); 
    } catch (error) {
        console.error(`Erreur lors de la récupération des détails de la personne ${id}:`, error);
        return json({ error: 'Personne non trouvée' }, { status: 404 })
    }
}