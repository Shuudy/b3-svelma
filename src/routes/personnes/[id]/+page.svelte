<script>
	import LogoHeader from '../../../components/LogoHeader.svelte';
    import MovieCard from '../../../components/MovieCard.svelte';

	export let data;
	const { person } = data;
	console.log("Person : ", person );

    
    let biographyParagraphs = person.biography ? person.biography.split('\n\n') : [];

    function formatDate(dateString) {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
    }

    let formattedBirthday = formatDate(person.birthday);
</script>


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
							{person.place_of_birth}
						</div>
					</div>

					<div class="actor-details__personalinfo-item">
						<div class="actor-details__personalinfo-item-title">Genre</div>
						<div class="actor-details__personalinfo-item-value">{person.gender === 1 ? 'Femme' : 'Homme'}</div>
					</div>

					<div class="actor-details__personalinfo-item">
						<div class="actor-details__personalinfo-item-title">Célèbre pour</div>
						<div class="actor-details__personalinfo-item-value">Acting</div>
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
                    {/each}
				</div>
			</div>
		</div>
	</div>

	<div class="actor-details__movies">
		<div class="actor-details__movies-title">Filmographie</div>
		<div class="actor-details__movies-list">
			{#each person.movie_credits.cast as movie}
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
	</div>
</div>


