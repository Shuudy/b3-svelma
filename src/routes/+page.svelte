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
	let filteredMovies = $state(data.popularMovies);
	let isSearchMode = $state(false);
	let searchQuery = $state("");

	// Etat pagination
	let currentPage = $state(data.currentPage || 1);
	let totalPages = $state(data.totalPages || 1);

	let showFilters = $state(false);
	let selectedGenres = $state([]);
	let selectedYears = $state([]);

	let searchBarRef;

	$effect(() => {
		document.body.style.overflow = showFilters ? 'hidden' : '';
	});

	$effect(() => {
		if (!isSearchMode) {
			filteredMovies = movies;
			currentPage = data.currentPage || 1;
			totalPages = data.totalPages || 1;
		}
	});

	function applyFilters() {
		if (!isSearchMode) {
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
	}

	// Gérer les résultats de recherche
	function handleSearchResults(searchData) {
		const { results, totalPages: searchTotalPages, currentPage: searchCurrentPage, query } = searchData;
		
		movies = results;
		filteredMovies = results;
		totalPages = searchTotalPages;
		currentPage = searchCurrentPage;
		isSearchMode = true;
		searchQuery = query;
		
		// Réinitialiser les filtres en mode recherche
		selectedGenres = [];
		selectedYears = [];
	}

	// Gérer le changement de page
	function handlePageChange(page) {
		if (isSearchMode && searchBarRef) {
			// Pagination côté serveur
			searchBarRef.searchPage(page);
		} else {
			// Pagination locale pour les films populaires filtrés
			currentPage = page;
		}
	}

	// Calculer de la pagination (mode non-recherche)
	const MOVIES_PER_PAGE = 20;
	let paginatedMovies = $derived.by(() => {
		if (isSearchMode) {
			return filteredMovies; 
		} else {
			// Pagination locale pour les filtres
			const start = (currentPage - 1) * MOVIES_PER_PAGE;
			const end = start + MOVIES_PER_PAGE;
			return filteredMovies.slice(start, end);
		}
	});

	$effect(() => {
		if (!isSearchMode) {
			totalPages = Math.ceil(filteredMovies.length / MOVIES_PER_PAGE);
		}
	});

	// Obtenir le thème actuel
	let isDark = $derived($theme === 'dark');
	
	let logoSrc = $derived(isDark ? '/svelma.svg' : '/svelma_light_mode.svg');
	let logoAlt = $derived(isDark ? 'Svelma Logo Dark' : 'Svelma Logo Light');
</script>

<svelte:head>
    <title>Svelma</title>
	<meta name="description" content="Découvrez les films populaires, filtrez par genre ou année et explorez les détails des films et acteurs sur Svelma." />
</svelte:head>

<Navbar/>
<div class="container">
	<header class="header">
		<div class="header__logo">
			<img width="225" height="146" src={logoSrc} alt={logoAlt} />
		</div>
		<div class="header__actions">
			<SearchBar bind:this={searchBarRef} onSearch={handleSearchResults} />
			<Filter onToggleFilters={() => (showFilters = true)} />
		</div>
	</header>
	<main class="movie-list-container" aria-label="Liste des films populaires">
		<div class="movie-list">
			{#if paginatedMovies.length > 0}
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
			{:else}
				<p>Aucun film à afficher</p>
			{/if}
		</div>		
		
		{#if totalPages > 1}
			<Pagination 
				currentPage={currentPage} 
				totalPages={totalPages} 
				on:pageChange={(e) => handlePageChange(e.detail)} 
			/>
		{/if}
	</main>
</div>

{#if showFilters}
	<Mask onClick={() => { showFilters = false; }} />
	<FilterBar
		genres={data.genres}
		selectedGenres={selectedGenres}
		selectedYears={selectedYears}
		onUpdateGenres={(updatedGenres) => { selectedGenres = updatedGenres; }}
		onUpdateYears={(updatedYears) => { selectedYears = updatedYears; }}
		onApplyFilters={applyFilters}
		onClose={() => { showFilters = false; }}
		autoFocus={true}
	/>
{/if}
