<script>
    import MovieDetails from "../../../components/MovieDetails.svelte";
    import ActorCard from "../../../components/ActorCard.svelte";

    export let data;
    const { movie, actors} = data;

    console.log("Movie:", movie);
    console.log("Actors:", actors);
</script>

{#if movie}
    <div class="banner" style={`--banner-image: url('https://image.tmdb.org/t/p/original/${movie.poster_path}')`}></div>

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
                {#each actors as actor, index}
                    <ActorCard
                        id={actor.id}
                        name={actor.name}
                        role={actor.role}
                        profile_path={actor.profile_path}
                    />
                {/each}
            </div>
        </div>
    </div>
{:else}
    <!-- // retourner page d'erreur -->
    <p>Film non trouvé ou erreur lors du chargement des données</p>
{/if}

