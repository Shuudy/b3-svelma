<script>
    import MovieDetails from "../../../components/MovieDetails.svelte";
    import ActorCard from "../../../components/ActorCard.svelte";
	import Pagination from "../../../components/Pagination.svelte";
	import Navbar from "../../../components/Navbar.svelte";

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
    <meta name="description" content={`Découvrez les détails, le casting et les informations du film ${movie?.original_title ?? ''} sur Svelma.`} />
</svelte:head>

{#if movie}
    <Navbar />
    <header
        class="banner"
        role="img"
        aria-label={`Bannière avec l'affiche du film ${movie.original_title}`}
        style={`--banner-image: url('${movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
        : '/defaultMovie.png'}')`}
    ></header>

    <main class="movie-details__container" aria-label={`Détails du film ${movie.original_title}`}>
        <article>
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
        </article>

        <section class="actors" aria-labelledby="casting-title">
            <h2 id="casting-title" class="actors-title">Casting</h2>
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
        </section>
    </main>
{:else}
    <main>
        <!-- // retourner page d'erreur -->
        <p role="alert">Film non trouvé ou erreur lors du chargement des données</p>
    </main>
{/if}

