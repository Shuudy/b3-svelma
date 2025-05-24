<script>
    import MovieDetails from "../../../components/MovieDetails.svelte";
    import ActorCard from "../../../components/ActorCard.svelte";
	import Pagination from "../../../components/Pagination.svelte";

    const { data } = $props();
    const { movie, actors} = data;

    // Pagination locale des acteurs
	const ACTORS_PER_ROW = 5;
	const ROWS_PER_PAGE = 2;
	const ACTORS_PER_PAGE = ACTORS_PER_ROW * ROWS_PER_PAGE;
	let currentActorsPage = $state(1);

    // Calcul de la pagination
	let totalActorsPages = $derived(Math.ceil(actors.length / ACTORS_PER_PAGE));
	let paginatedActors = $derived(
		actors.slice(
			(currentActorsPage - 1) * ACTORS_PER_PAGE,
			currentActorsPage * ACTORS_PER_PAGE
		)
	);

    function handleActorsPageChange(page) {
        currentActorsPage = page;
    }

</script>

<svelte:head>
    <title>{movie ? `${movie.original_title} - Svelma` : "Film non trouvé - Svelma"}</title>
</svelte:head>

{#if movie}
    <div
        class="banner"
        style={`--banner-image: url('${movie.poster_path
        ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
        : '/defaultMovie.png'}')`}
    ></div>

    <div class="movie-details__container">
        <MovieDetails 
            original_title={movie.original_title}
            genres={movie.genres}
            vote_average={movie.vote_average}
            vote_count={movie.vote_count}
            poster_path={movie.poster_path}
            release_date={movie.release_date}
            runtime={movie.runtime}
            overview={movie.overview}
        />

        <div class="actors">
            <div class="actors-title">Casting</div>
            <div class="actors-list">
                {#each paginatedActors as actor}
                    <ActorCard
                        id={actor.id}
                        name={actor.name}
                        role={actor.role}
                        profile_path={actor.profile_path}
                    />
                {/each}
            </div>
            {#if totalActorsPages > 1}
                <Pagination
                    currentPage={currentActorsPage}
                    totalPages={totalActorsPages}
                    on:pageChange={e => handleActorsPageChange(e.detail)}
                />
            {/if}
        </div>
    </div>
{:else}
    <!-- // retourner page d'erreur -->
    <p>Film non trouvé ou erreur lors du chargement des données</p>
{/if}

