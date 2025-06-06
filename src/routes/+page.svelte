<script>
	import SearchBar from '../components/SearchBar.svelte';
	import Filter from '../components/Filter.svelte';
	import MovieCard from '../components/MovieCard.svelte';
	import Pagination from '../components/Pagination.svelte';
	import FilterBar from '../components/FilterBar.svelte';
	import Mask from '../components/Mask.svelte';
	import Navbar from '../components/Navbar.svelte';
	import { theme } from '$lib/stores/theme';

	const { data } = $props();
	let movies = $state(data.popularMovies);
	// svelte-ignore state_referenced_locally
	let filteredMovies = $state(movies);

	let showFilters = $state(false);
	let selectedGenres = $state([]);
	let selectedYears = $state([]);

	// Pagination locale
	const MOVIES_PER_PAGE = 20;
	let currentPage = $state(1);
	let searchTotalPages = $state(1);
	let isSearchActive = $state(false);

	let searchBarRef;

	$effect(() => {
		document.body.style.overflow = showFilters ? 'hidden' : '';
	});

	function applyFilters() {
		const source = isSearchActive ? movies : data.popularMovies;

		filteredMovies = source.filter((movie) => {
			const movieYear = parseInt(movie.release_date?.split('-')[0]);
			const matchesGenres =
				selectedGenres.length === 0 ||
				movie.genre_ids.some((genreId) => selectedGenres.includes(genreId));
			const matchesYear = selectedYears.length === 0 || selectedYears.includes(movieYear);
			return matchesYear && matchesGenres;
		});

		if (!isSearchActive) {
			currentPage = 1;
		}
	}

	// Calcul de la pagination
	let totalPages = $derived(
		isSearchActive ? searchTotalPages : Math.ceil(filteredMovies.length / MOVIES_PER_PAGE)
	);

	let paginatedMovies = $derived(
		isSearchActive
			? filteredMovies
			: filteredMovies.slice((currentPage - 1) * MOVIES_PER_PAGE, currentPage * MOVIES_PER_PAGE)
	);

	function handlePageChange(page) {
		if (isSearchActive) {
			searchBarRef.searchAtPage(page);
		} else {
			currentPage = page;
		}
	}

	// Obtenir le thème actuel
	let isDark = $derived($theme === 'dark');
	let logoSrc = $derived(isDark ? '/svelma.svg' : '/svelma_light_mode.svg');
	let logoAlt = $derived(isDark ? 'Svelma Logo Dark' : 'Svelma Logo Light');
</script>

<svelte:head>
	<title>Svelma</title>
	<meta
		name="description"
		content="Découvrez les films populaires, filtrez par genre ou année et explorez les détails des films et acteurs sur Svelma."
	/>
</svelte:head>

<Navbar />
<div class="container">
	<header class="header">
		<div class="header__logo">
			<img width="225" height="146" src={logoSrc} alt={logoAlt} />
		</div>
		<div class="header__actions">
			<SearchBar
				bind:this={searchBarRef}
				on:search={(e) => {
					movies = e.detail.results;
					searchTotalPages = e.detail.total_pages;
					currentPage = e.detail.page;
					isSearchActive = true;
					applyFilters();
				}}
				on:reset={() => {
					movies = data.popularMovies;
					isSearchActive = false;
					currentPage = 1;
					applyFilters();
				}}
			/>
			<Filter onToggleFilters={() => (showFilters = true)} />
		</div>
	</header>
	<main class="movie-list-container" aria-label="Liste des films populaires">
		<div class="movie-list">
			{#if (isSearchActive && filteredMovies.length === 0) || (!isSearchActive && paginatedMovies.length === 0)}
				<p>Aucun film à afficher</p>
			{:else}
				{#each paginatedMovies as movie}
					<MovieCard
						key={movie.id}
						id={movie.id}
						title={movie.title}
						year={movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}
						vote_average={movie.vote_average}
						poster_path={movie.poster_path}
					/>
				{/each}
			{/if}
		</div>
		{#if (isSearchActive && movies.length > 0 && totalPages > 1) || (!isSearchActive && filteredMovies.length > MOVIES_PER_PAGE)}
			<Pagination {currentPage} {totalPages} on:pageChange={(e) => handlePageChange(e.detail)} />
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
