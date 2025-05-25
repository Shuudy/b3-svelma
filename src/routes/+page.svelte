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

	// Pagination locale
	const MOVIES_PER_ROW = 5;
	const ROWS_PER_PAGE = 2;
	const MOVIES_PER_PAGE = MOVIES_PER_ROW * ROWS_PER_PAGE;
	let currentPage = $state(1);

	$effect(() => {
		document.body.style.overflow = showFilters ? 'hidden' : '';
	});

	$effect(() => {
		filteredMovies = movies;
		currentPage = 1;
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

		currentPage = 1;
	}

	// Calcul de la pagination
	let totalPages = $derived(Math.ceil(filteredMovies.length / MOVIES_PER_PAGE));
	let paginatedMovies = $derived(
		filteredMovies.slice(
			(currentPage - 1) * MOVIES_PER_PAGE,
			currentPage * MOVIES_PER_PAGE
		)
	);

	function handlePageChange(page) {
		currentPage = page;
	}

</script>

<svelte:head>
    <title>Svelma</title>
	<meta name="description" content="Découvrez les films populaires, filtrez par genre ou année et explorez les détails des films et acteurs sur Svelma." />
</svelte:head>

<div class="container">
	<header class="header">
		<div class="header__logo">
			<img src="/svelma.svg" alt="Svelma Logo" />
		</div>
		<div class="header__actions">
			<SearchBar on:search={(e) => (movies = e.detail.results)} />
			<Filter onToggleFilters={() => (showFilters = true)} />
		</div>
	</header>
	<main class="movie-list" aria-label="Liste des films populaires">
		{#if paginatedMovies.length > 0}
			{#each paginatedMovies as movie}
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
			<p>Aucun film à afficher</p>
		{/if}
		{#if filteredMovies.length > 0}
			<Pagination {currentPage} {totalPages} on:pageChange={e => handlePageChange(e.detail)} />
		{/if}
	</main>
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
		autoFocus={true}
	/>
{/if}
