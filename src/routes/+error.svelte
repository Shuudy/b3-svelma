<script>
    import { page } from "$app/stores";
</script>

<div>
    <h1>{$page.status}</h1>
    <p>{$page.error?.message || 'Une erreur est survenue'}</p>

    {#if $page.status === 404}
        <di>
            <p>La page que vous recherchez est introuvable.</p>
        </di>
    {:else if $page.status === 500}
        <div>
            <p>Erreur serveur: Veuillez réessayer plus tard.</p>
        </div>
    {/if}

    <a href="/">Retour à l'accueil</a>
</div>