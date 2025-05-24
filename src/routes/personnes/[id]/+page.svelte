<script>
	import LogoHeader from '../../../components/LogoHeader.svelte';
    import MovieCard from '../../../components/MovieCard.svelte';
	import Pagination from '../../../components/Pagination.svelte';

	const { data } = $props();
	const { person } = data;
	console.log("Person : ", person );

    
    let biographyParagraphs = person.biography ? person.biography.split('\n\n') : [];

    function formatDate(dateString) {
		if (!dateString) return "Date inconnue";
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
    }

    let formattedBirthday = formatDate(person.birthday);

	// Pagination locale pour la filmographie
	const MOVIES_PER_ROW = 5;
	const ROWS_PER_PAGE = 2;
	const MOVIES_PER_PAGE = MOVIES_PER_ROW * ROWS_PER_PAGE;
	let currentMoviesPage = $state(1);

	// Calcul de la pagination
	let totalMoviesPages = $derived(Math.ceil(person.movie_credits.cast.length / MOVIES_PER_PAGE));
	let paginatedMovies = $derived(
		person.movie_credits.cast.slice(
			(currentMoviesPage - 1) * MOVIES_PER_PAGE,
			currentMoviesPage * MOVIES_PER_PAGE
		)
	);

	function handleMoviesPageChange(page) {
		currentMoviesPage = page;
	}
</script>

<svelte:head>
    <title>{person ? `${person.name} - Svelma` : "Personne non trouvée - Svelma"}</title>
</svelte:head>

<LogoHeader />
<div class="actor-details__container">
	<div class="actor-details">
		<div class="actor-details__left">
			<div class="actor-details__image">
				<img
					src={person.profile_path ? `https://image.tmdb.org/t/p/w500/${person.profile_path}` : '/default-profile.svg'}
					alt={person.name}
				/>
			</div>

			<div class="actor-details__personalinfo">
				<div class="actor-details__personalinfo-title">Informations personnelles</div>
				<div class="actor-details__personalinfo-items">
					<div class="actor-details__personalinfo-item">
						<div class="actor-details__personalinfo-item-title">Lieu de naissance</div>
						<div class="actor-details__personalinfo-item-value">
							{person.place_of_birth ?? "Lieu inconnu"}
						</div>
					</div>

					<div class="actor-details__personalinfo-item">
						<div class="actor-details__personalinfo-item-title">Genre</div>
						<div class="actor-details__personalinfo-item-value">{person.gender === 1 ? 'Femme' : 'Homme'}</div>
					</div>

					<div class="actor-details__personalinfo-item">
						<div class="actor-details__personalinfo-item-title">Célèbre pour</div>
						<div class="actor-details__personalinfo-item-value">{person.known_for_department ?? "??"}</div>
					</div>
				</div>
			</div>
		</div>
		<div class="actor-details__right">
			<div class="actor-details__infos">
				<div class="actor-details__infos-name">{person.name}</div>
				<div class="actor-details__infos-birthday">Né(e) le {formattedBirthday}</div>
			</div>
			<div class="actor-details__biography">
				<div class="actor-details__biography-title">Biographie</div>
				<div class="actor-details__biography-text">
                    {#each biographyParagraphs as paragraph, index}
                        <p style="margin-top: {index === 0 ? '0' : ''}">{paragraph}</p>
					{:else}
						<p style="margin-top: 0">Aucune biographie disponible.</p>
                    {/each}
				</div>
			</div>
		</div>
	</div>

	<div class="actor-details__movies">
		<div class="actor-details__movies-title">Filmographie</div>
		<div class="actor-details__movies-list">
			{#each paginatedMovies as movie}
				<MovieCard
					key={movie.id}
					id={movie.id}
					title={movie.title}
					year={movie.release_date?.split('-')[0] || 'N/A'}
					vote_average={movie.vote_average}
					poster_path={movie.poster_path}
				/>
			{/each}
		</div>
		{#if totalMoviesPages > 1}
			<Pagination
				currentPage={currentMoviesPage}
				totalPages={totalMoviesPages}
				on:pageChange={e => handleMoviesPageChange(e.detail)}
			/>
		{/if}
	</div>
</div>


