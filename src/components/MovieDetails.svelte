<script>
    let { original_title, genres, vote_average, vote_count, poster_path, release_date, runtime, overview } = $props();

    let formattedVoteAverage = vote_average.toLocaleString('fr-FR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

    function formatRuntime(minutes) {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return hours > 0 ? `${hours}h${remainingMinutes > 0 ? remainingMinutes + 'min' : ''}` : `${remainingMinutes}min`;
    }

    let formattedRuntime = formatRuntime(runtime);

    function formatDate(dateString) {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return "Date inconnue";
        }
        return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
    }

    let formattedReleaseDate = formatDate(release_date);

    const defaultMovieCard = '/defaultMovie.png';
</script>

<article class="movie-details">
    <div class="movie-details__image">
        <img src={poster_path ? `https://image.tmdb.org/t/p/original/${poster_path}` : defaultMovieCard} alt={`Affiche du film ${original_title}`} />
    </div>
    <section class="movie-details__infos" aria-labelledby="movie-title">

        <h1 id="movie-title" class="movie-details__infos-title">{original_title}</h1>
        <div class="movie-details__infos-datetime">{formattedReleaseDate} - {formattedRuntime}</div>

        <div class="movie-details__infos-types" aria-label="Genres">
            {#each genres as genre}
                <span class="movie-details__infos-type">{genre.name}</span>
            {/each}
        </div>

        <div class="movie-details__infos-rating" aria-label={`Note moyenne : ${formattedVoteAverage} sur 10, basée sur ${vote_count} votes`}>
            <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                <path d="M10.5 0L14.0691 5.82956L21 7.25735L16.275 12.288L16.9894 19L10.5 16.2796L4.01064 19L4.725 12.288L0 7.25735L6.93085 5.82956L10.5 0Z" fill="#FFCB45"/>
            </svg>
            <span class="movie-details__infos-rating-value">{formattedVoteAverage}</span>
            <span class="movie-details__infos-rating-number">({vote_count} votes)</span>
        </div>

        <div class="movie-details__infos-synopsis" aria-labelledby="synopsis-title">
            <h2 id="synopsis-title" class="movie-details__infos-synopsis-title">Synopsis</h2>
            <div class="movie-details__infos-synopsis-text">
                {overview && overview.trim() ? overview : "Aucun synopsis disponible pour ce film."}
            </div>
        </div>
    </section>
</article>