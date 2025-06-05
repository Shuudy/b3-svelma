<script>
	import { theme } from "$lib/stores/theme";

	// Obtenir le thème actuel
	let isDark = $derived($theme === 'dark');
	let logoSrc = $derived(isDark ? '/svelma.svg' : '/svelma_light_mode.svg');
	let logoAlt = $derived(isDark ? 'Svelma Logo Dark' : 'Svelma Logo Light');

</script>
<header class="logo-header">
	<div class="logo-header__container">
		<a href="/" aria-label="Accueil - Svelma">
			<img src={logoSrc} alt={logoAlt} />
		</a>
	</div>
</header>

<style>
	a {
		display: inline-block;
		line-height: 0;
	}
	img {
		width: 195px;
		height: 78px;
	}
</style>
