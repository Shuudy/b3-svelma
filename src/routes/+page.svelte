<script>
	import SearchBar from '../components/SearchBar.svelte';
	import Filter from '../components/Filter.svelte';
	import MovieCard from '../components/MovieCard.svelte';
	import Pagination from '../components/Pagination.svelte';
	import FilterBar from '../components/FilterBar.svelte';
	import Mask from '../components/Mask.svelte';

	const { data } = $props();
	let movies = $state(data.popularMovies);
	let filteredMovies = $state(movies);

	let showFilters = $state(false);
	let selectedGenres = $state([]);
	let selectedYears = $state([]);
	$effect(() => {
		document.body.style.overflow = showFilters ? 'hidden' : '';
	});

	$effect(() => {
		filteredMovies = movies;
	});

	function applyFilters() {
		filteredMovies = movies.filter((movie) => {
			const movieYear = movie.release_date?.split('-')[0];

			const matchesGenres =
				selectedGenres.length === 0 ||
				movie.genre_ids.some((genreId) => selectedGenres.includes(genreId));
			const matchesYear = selectedYears.length === 0 || selectedYears.includes(movieYear);

			return matchesYear && matchesGenres;
		});
	}
</script>

<div class="container">
	<div class="header">
		<div class="header__logo">
			<img src="/svelma.svg" alt="Svelma Logo" />
		</div>
		<div class="header__actions">
			<SearchBar on:search={(e) => (movies = e.detail.results)} />
			<Filter onToggleFilters={() => (showFilters = true)} />
		</div>
	</div>
	<div class="movie-list">
		{#if filteredMovies.length > 0}
			{#each filteredMovies as movie}
				<MovieCard
					key={movie.id}
					id={movie.id}
					title={movie.title}
					year={movie.release_date.split('-')[0]}
					vote_average={movie.vote_average}
					poster_path={movie.poster_path}
				/>
			{/each}
		{:else}
			<!-- a completer avec page d'érreur -->
			<p>Aucun film à afficher</p>
		{/if}
	</div>
	<Pagination />
</div>

{#if showFilters}
	<Mask onClick={() => (showFilters = false)} />
	<FilterBar
		genres={data.genres}
		{selectedGenres}
		{selectedYears}
		onUpdateGenres={(updatedGenres) => (selectedGenres = updatedGenres)}
		onUpdateYears={(updatedYears) => (selectedYears = updatedYears)}
		onApplyFilters={applyFilters}
		onClose={() => (showFilters = false)}
	/>
{/if}
