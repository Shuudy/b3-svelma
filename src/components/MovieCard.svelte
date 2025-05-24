<script>
    let { id, title, year, vote_average, poster_path } = $props();

    let formattedVoteAverage = vote_average.toLocaleString('fr-FR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    
    const defaultMovieCard = '/defaultMovie.png';
</script>

<a class="movie-card" href="/films/{id}">
    <div class="movie-card__image">
        <img src={poster_path ? `https://image.tmdb.org/t/p/original/${poster_path}` : defaultMovieCard} alt={title} />
    </div>
    <div class="movie-card__info">
        <div class="movie-card__title">{title}</div>
        <div class="movie-card__year">{year}</div>
        <div class="movie-card__rating">                    
            <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 0L8.03951 3.37501L12 4.20163L9.3 7.11411L9.7082 11L6 9.42501L2.2918 11L2.7 7.11411L0 4.20163L3.96049 3.37501L6 0Z" fill="#FFCB45"/>
            </svg>
            <span>{formattedVoteAverage}</span>
        </div>
    </div>
</a>