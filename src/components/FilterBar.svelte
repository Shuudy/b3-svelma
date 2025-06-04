<script>
	import { onMount } from "svelte";

	const years = ['2020', '2021', '2022', '2023', '2024', '2025'];

	let {
		genres,
		selectedGenres,
		selectedYears,
		onClose,
		onUpdateGenres,
		onUpdateYears,
		onApplyFilters,
		autoFocus = false // Focus automatique
	} = $props();

	let closeButton;

	let isGenresOpen = $state(selectedGenres.length > 0);
	let isYearsOpen = $state(selectedYears.length > 0);

	function toggleDropdown(dropdown) {
        if (dropdown === "genres") {
            isGenresOpen = !isGenresOpen;
        } else if (dropdown === "years") {
            isYearsOpen = !isYearsOpen;
        }
    }

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

	onMount(() => {
		if (autoFocus && closeButton) {
			closeButton.focus()
		}
	})
</script>

<aside class="filterbar">
	<div class="filterbar__content">
		<header class="filterbar__header">
			<h2 class="filterbar__header-title">Filtres</h2>
			<button type="button" class="filterbar__header-close" onclick={onClose} aria-label="Fermer le panneau des filtres" bind:this={closeButton}>
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
			</button>
		</header>
		<section class="filterbar__dropdown" aria-labelledby="genres-label">
			<button class="filterbar__dropdown-header" id="genres-label" onclick={() => toggleDropdown("genres")}>
				<span>Genres</span>
				<svg
					class:rotated={isGenresOpen}
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
					focusable="false"
				>
					<path
						d="M6 9L12 15L18 9"
						stroke="white"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
			{#if isGenresOpen}
				<div class="filterbar__dropdown-content">
					{#each genres as genre}
						<label class="filterbar__checkbox">
							<input
								type="checkbox"
								value={genre.id}
								checked={isGenreSelected(genre.id)}
								onchange={() => toggleGenre(genre.id)}
								onkeydown={(e) => {
									if (e.key === "Enter") {
										e.preventDefault();
										toggleGenre(genre.id);
									}
								}}
								aria-checked={isGenreSelected(genre.id)}
							/>
							<span>{genre.name}</span>
						</label>
					{/each}
				</div>
			{/if}
		</section>
		<section class="filterbar__dropdown" aria-labelledby="years-label">
			<button class="filterbar__dropdown-header" id="years-label" onclick={() => toggleDropdown("years")}>
				<span>Années</span>
				<svg
					class:rotated={isYearsOpen}
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
					focusable="false"
				>
					<path
						d="M6 9L12 15L18 9"
						stroke="white"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
			{#if isYearsOpen}
				<div class="filterbar__dropdown-content">
					{#each years as year}
						<label class="filterbar__checkbox">
							<input
								type="checkbox"
								value={year}
								checked={isYearSelected(year)}
								onchange={() => toggleYear(year)}
								onkeydown={(e) => {
									if (e.key === "Enter") {
										e.preventDefault();
										toggleYear(year);
									}
								}}
								aria-checked={isYearSelected(year)}
							/>
							<span>{year}</span>
						</label>
					{/each}
				</div>
			{/if}
		</section>

		<button class="filterbar__button" type="button" onclick={applyFilters}>Appliquer les filtres</button>
	</div>
</aside>

<style>
	input[type="checkbox"]:focus-visible {
		outline: 1.8px solid #fff;
		outline-offset: 1.8px;
	}

	.filterbar__button:focus-visible,
	.filterbar__header-close:focus-visible {
		outline: 2px solid #fff;
		outline-offset: 2px;
	}

	.filterbar__dropdown-header .rotated {
		transform: rotate(180deg);
	}
</style>
