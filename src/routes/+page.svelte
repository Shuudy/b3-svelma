<script>
    import SearchBar from "../components/SearchBar.svelte";
    import Filter from "../components/Filter.svelte";
    import MovieCard from "../components/MovieCard.svelte";
    import Pagination from "../components/Pagination.svelte";
</script>

<div class="container">
	<div class="header">
		<div class="header__logo">
			<img src="/svelma.svg" alt="Svelma Logo" />
		</div>
		<div class="header__actions">
			<SearchBar />
			<Filter />
		</div>
	</div>
	<div class="movie-list">
		{#each Array(10) as _, index}
			<MovieCard key={index} id="2" title="Movie title" year="2024" vote_average="5,4" poster_path="/ceG9VzoRAVGwivFU403Wc3AHRys.jpg"  />
		{/each}
	</div>
	<Pagination />
</div>
