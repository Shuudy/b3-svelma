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
        return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
    }

    let formattedReleaseDate = formatDate(release_date);
</script>

<div class="movie-details">
    <div class="movie-details__image">
        <img src="https://image.tmdb.org/t/p/original/{poster_path}" alt="" />
    </div>
    <div class="movie-details__infos">

        <div class="movie-details__infos-title">{original_title}</div>
        <div class="movie-details__infos-datetime">{formattedReleaseDate} - {formattedRuntime}</div>

        <div class="movie-details__infos-types">
            {#each genres as genre}
                <span class="movie-details__infos-type">{genre.name}</span>
            {/each}
        </div>

        <div class="movie-details__infos-rating">
            <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5 0L14.0691 5.82956L21 7.25735L16.275 12.288L16.9894 19L10.5 16.2796L4.01064 19L4.725 12.288L0 7.25735L6.93085 5.82956L10.5 0Z" fill="#FFCB45"/>
            </svg>
            <span class="movie-details__infos-rating-value">{vote_average}</span>
            <span class="movie-details__infos-rating-number">({vote_count} votes)</span>
        </div>

        <div class="movie-details__infos-synopsis">
            <div class="movie-details__infos-synopsis-title">Synopsis</div>
            <div class="movie-details__infos-synopsis-text">
                {overview}
            </div>
        </div>
    </div>
</div>