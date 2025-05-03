<script>
	const years = ['2020', '2021', '2022', '2023', '2024', '2025'];

	let {
		genres,
		selectedGenres,
		selectedYears,
		onClose,
		onUpdateGenres,
		onUpdateYears,
		onApplyFilters
	} = $props();

	function isGenreSelected(genreId) {
		return selectedGenres.includes(genreId);
	}

	function isYearSelected(year) {
		return selectedYears.includes(year);
	}

	function toggleGenre(genreId) {
		if (isGenreSelected(genreId)) {
			selectedGenres = selectedGenres.filter((id) => id !== genreId);
		} else {
			selectedGenres = [...selectedGenres, genreId];
		}

		onUpdateGenres(selectedGenres);
	}

	function toggleYear(year) {
		if (isYearSelected(year)) {
			selectedYears = selectedYears.filter((y) => y !== year);
		} else {
			selectedYears = [...selectedYears, year];
		}

		onUpdateYears(selectedYears);
	}

	function applyFilters() {
		onApplyFilters();
		onClose();
	}
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
						<input
							type="checkbox"
							value={genre.id}
							checked={isGenreSelected(genre.id)}
							on:change={() => toggleGenre(genre.id)}
						/>
						<span>{genre.name}</span>
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
						<input
							type="checkbox"
							value={year}
							checked={isYearSelected(year)}
							on:change={() => toggleYear(year)}
						/>
						<span>{year}</span>
					</label>
				{/each}
			</div>
		</div>

		<div class="filterbar__button" on:click={applyFilters}>Appliquer les filtres</div>
	</div>
</div>
