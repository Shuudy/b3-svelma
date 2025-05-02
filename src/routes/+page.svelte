<script>
    import SearchBar from "../components/SearchBar.svelte";
    import Filter from "../components/Filter.svelte";
    import MovieCard from "../components/MovieCard.svelte";
    import Pagination from "../components/Pagination.svelte";
	import FilterBar from "../components/FilterBar.svelte";
	import Mask from "../components/Mask.svelte";

	let movies = $state([]);

	let showFilters = $state(false);
</script>

<div class="container">
	<div class="header">
		<div class="header__logo">
			<img src="/svelma.svg" alt="Svelma Logo" />
		</div>
		<div class="header__actions">
			<SearchBar on:search={(e) => (movies = e.detail.results)}/>
			<Filter onToggleFilters={() => showFilters = true} />
		</div>
	</div>
	<div class="movie-list">
		{#if movies.length > 0}
			{#each movies as movie}
				<MovieCard key={movie.id} id={movie.id} title={movie.title} year={movie.release_date.split("-")[0]} vote_average={movie.vote_average} poster_path={movie.poster_path}  />
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
    <FilterBar onClose={() => showFilters = false} />
{/if}