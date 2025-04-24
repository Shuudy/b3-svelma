<script>
	import { page } from '$app/stores';
</script>

<div class="error">
	<div class="error__content">
		<div class="error__status">{$page.status}</div>
		<div class="error__message">{$page.error?.message || 'Une erreur est survenue'}</div>
		<div class="error__description">
			{#if $page.status === 404}
				La page que vous recherchez est introuvable.
			{:else if $page.status === 500}
				Erreur serveur: Veuillez réessayer plus tard.
			{/if}
		</div>
		<a href="/" class="error__button">Revenir à l'accueil</a>
	</div>
</div>

<style>
	.error {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100dvh;
	}

	.error__content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		text-align: center;
		max-width: 600px;
		margin: 0 auto;
	}

	.error__status {
		font-size: 8rem;
		font-weight: 700;
	}

	.error__message {
		font-size: 1.5rem;
		font-weight: 700;
		margin-top: 1rem;
	}

	.error__description {
		color: rgb(156, 163, 175);
		margin-top: 1rem;
	}

	.error__button {
		display: flex;
		background-color: #fff;
		color: #000;
		border-radius: 6px;
		padding: 0.5rem 1rem;

		margin-top: 1rem;
	}
</style>
