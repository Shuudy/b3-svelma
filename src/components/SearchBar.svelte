<script>
	import { searchMovies } from "$lib/api/tmdb";
    import { createEventDispatcher } from "svelte";

    let query = "";
    const dispatch = createEventDispatcher();

    // Effectuer la recherche
    async function handleSearch() {
        if (query.trim()) {
            try {
                // Appel à l'API TMDB pour rechercher des films
                const response = await searchMovies(query);
                dispatch("search", { results: response.results });
            } catch (error) {
                console.error("Erreur lors de la recherche :", error);
            }
        }
    }

</script>

<form class="searchbar" role="search" aria-label="Recherche de films">
    <input 
        type="text" 
        placeholder="Rechercher un film ..." 
        name="" 
        id="" 
        bind:value={query}
        on:keydown={(e) => e.key === "Enter" && handleSearch()}
    />
    
    <button type="button" aria-label="Lancer la recherche" on:click={handleSearch}>
         <svg 
            width="20" 
            height="20" 
            viewBox="0 0 20 20" 
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >

            <path d="M15.1665 15.1113L18.3333 18.3335" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16.6667 9.1665C16.6667 5.02437 13.3089 1.6665 9.16675 1.6665C5.02461 1.6665 1.66675 5.02437 1.66675 9.1665C1.66675 13.3087 5.02461 16.6665 9.16675 16.6665C13.3089 16.6665 16.6667 13.3087 16.6667 9.1665Z" stroke="white" stroke-width="2" stroke-linejoin="round"/>
        </svg>
    </button>
</form>

<style>
    input {
        padding-right: 30px;
    }

    input:focus-visible {
        outline: 1px solid #fff;
        outline-offset: 1px;
    }

    .searchbar {
        position: relative;
    }

    button {
        display: inline-flex;
        position: absolute; 
        top: 50%;
        right: 4px;
        transform: translateY(-50%);
    }

    button:focus-visible {
        outline: 1px solid #fff;
        outline-offset: 1px;
    }
</style>