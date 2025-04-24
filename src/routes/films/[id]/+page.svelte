<script>
    import MovieDetails from "../../../components/MovieDetails.svelte";
    import ActorCard from "../../../components/ActorCard.svelte";

    const movie = {
        original_title: "Miami Vice",
        genres: [{ name: "Action" }, { name: "Crime" }, { name: "Trhiller" }],
        vote_average: 8.8,
        vote_count: 15000,
        poster_path: "/1KGD2g0wOc7WBfHc5G19reLHQxk.jpg",
        release_date: "2006-07-27",
        runtime: 132,
        overview: "Miami… Deux agents fédéraux et la famille d'un informateur ont été sauvagement exécutés. Une nouvelle enquête commence pour Sonny Crockett et son coéquipier Ricardo Tubbs, avec une certitude : la fuite qui a permis ce massacre en règle provenait des sommets de la hiérarchie… Les deux inspecteurs découvrent rapidement que les tueurs étaient au service de la Fraternité Aryenne, organisation suprématiste liée à un réseau de trafiquants internationaux doté d'un système de protection ultra-sophistiqué. Poursuivant leurs investigations, les deux partenaires prennent contact avec l'administratrice financière du cartel, Isabella, une sino-cubaine aussi experte en investissements et transferts de fonds qu'en blanchiment d'argent. La séduisante Isabella offre contre toute attente à Sonny une chance d'exorciser ses démons…"
    };

    const actors = [
        { id: 1, name: "Jamie Foxx", role: "Det. Ricardo 'Rico' Tubbs", profile_path: "/hPwCMEq6jLAidsXAX5BfoYgIfg2.jpg" },
        { id: 2, name: "Gong Li", role: "Isabella", profile_path: "/uP3Fs3QUsGBxhNqGFWMnN1Z2l8z.jpg" },
        { id: 3, name: "Naomie Harris", role: "Det. Trudy Joplin", profile_path: "/41TVAcYqKKF7PGf3x7QfaLvkLSW.jpg" }
    ];
</script>

<div class="banner" style="--banner-image: url('https://image.tmdb.org/t/p/original/{movie.poster_path}')"></div>

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