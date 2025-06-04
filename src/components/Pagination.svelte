<script>
	import { createEventDispatcher } from "svelte";

    export let currentPage = 1;
    export let totalPages = 1;
    const dispatch = createEventDispatcher();

    function goToPage(page) {
        if (page >= 1 && page <= totalPages) {
            dispatch("pageChange", page);
        }
    }
</script>

<nav class="pagination" aria-label="Navigation de pagination">
    <button
        class="page-arrow"
        disabled={currentPage === 1}
        on:click={() => goToPage(currentPage - 1)}
        aria-label="Page précédente"
    >
        &lt;
    </button>
    <span>
        Page {currentPage} sur {totalPages}
    </span>
    <button
        class="page-arrow"
        disabled={currentPage === totalPages}
        on:click={() => goToPage(currentPage + 1)}
        aria-label="Page suivante"
    >
        &gt;
    </button>
</nav>

<style>
    .pagination span {
        margin: 0 1rem;
    }

    button:focus-visible {
        outline: 1px solid var(--text);
        outline-offset: 1px;
    }
</style>