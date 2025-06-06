<script>
  import { theme } from '$lib/stores/theme';
  import { onMount, tick } from 'svelte';
  import { goto } from '$app/navigation';
  import { shouldFocusSearch } from '$lib/stores/focusSearch';
  import { get } from 'svelte/store';
  import { page } from '$app/stores';

  // Initialiser le thème
  onMount(() => {
    theme.init();
  });

  // basculer le thème
  function toggleTheme() {
    theme.toggle();
  }
  
  // Obtenir le thème actuel
  let isDark = $derived($theme === 'dark');

  let logoSrc = $derived(isDark ? '/svelma.svg' : '/svelma_light_mode.svg');
  let logoAlt = $derived(isDark ? 'Svelma Logo Dark' : 'Svelma Logo Light');

  async function handleSearchIconClick() {
		const currentPath = get(page).url.pathname;

		if (currentPath === '/') {
			shouldFocusSearch.set(true);
		} else {
      await goto('/');
      await tick();
			shouldFocusSearch.set(true);			
		}
	}
</script>

<nav class="navbar" aria-label="Navigation principale">
  <div class="navbar__content">
    <div class="navbar__logo">
      <a href="/" aria-label="Retour à l'accueil">
        <img width="89" height="36" src={logoSrc} alt={logoAlt} />
      </a>
    </div>

    <div class="navbar__actions">
      <button type="button" class="navbar__search" aria-label="Rechercher un film" onclick={handleSearchIconClick}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M15.229 15.1113L18.3935 18.3335"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16.728 9.1665C16.728 5.02437 13.3726 1.6665 9.23337 1.6665C5.09422 1.6665 1.73877 5.02437 1.73877 9.1665C1.73877 13.3087 5.09422 16.6665 9.23337 16.6665C13.3726 16.6665 16.728 13.3087 16.728 9.1665Z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <button 
        type="button" 
        class="navbar__theme-toggle" 
        aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
        onclick={toggleTheme}
      >
        {#if isDark}
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M10.0344 1.6665V3.33317M10.0344 16.6665V18.3332M4.14695 4.10817L5.32112 5.28317M14.7477 14.7165L15.9219 15.8915M1.70703 9.99984H3.37251M16.6963 9.99984H18.3618M5.32112 14.7165L4.14695 15.8915M15.9219 4.10817L14.7477 5.28317M13.3654 9.99984C13.3654 11.8408 11.874 13.3332 10.0344 13.3332C8.19478 13.3332 6.70346 11.8408 6.70346 9.99984C6.70346 8.15889 8.19478 6.6665 10.0344 6.6665C11.874 6.6665 13.3654 8.15889 13.3654 9.99984Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        {:else}
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        {/if}
      </button>
    </div>
  </div>
</nav>
<div class="navbar__spacer"></div>