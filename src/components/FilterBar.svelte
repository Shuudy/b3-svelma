<script>
	const genres = ['Action', 'Aventure', 'Comédie', 'Drame', 'Horreur', 'Science-fiction'];

	const years = ['2020', '2021', '2022', '2023', '2024', '2025'];

	const { onClose } = $props();
</script>

<div class="filterbar">
	<div class="filterbar__content">
		<div class="filterbar__header">
			<div class="filterbar__header-title">Filtres</div>
			<div class="filterbar__header-close" on:click={onClose}>
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="#fff"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
					/>
				</svg>
			</div>
		</div>
		<div class="filterbar__dropdown">
			<div class="filterbar__dropdown-header">
				<span>Genres</span>
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M6 9L12 15L18 9"
						stroke="white"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</div>
			<div class="filterbar__dropdown-content">
				{#each genres as genre}
					<label class="filterbar__checkbox">
						<input type="checkbox" value={genre} />
						<span>{genre}</span>
					</label>
				{/each}
			</div>
		</div>
		<div class="filterbar__dropdown">
			<div class="filterbar__dropdown-header">
				<span>Années</span>
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M6 9L12 15L18 9"
						stroke="white"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</div>
			<div class="filterbar__dropdown-content">
				{#each years as year}
					<label class="filterbar__checkbox">
						<input type="checkbox" value={year} />
						<span>{year}</span>
					</label>
				{/each}
			</div>
		</div>

		<div class="filterbar__button">Appliquer les filtres</div>
	</div>
</div>
