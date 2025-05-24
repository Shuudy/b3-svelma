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

<div class="pagination">
    <button
        class="page-arrow"
        disabled={currentPage === 1}
        on:click={() => goToPage(currentPage - 1)}
    >
        &lt;
    </button>
    <span style="margin: 0 1rem;">
        Page {currentPage} sur {totalPages}
    </span>
    <button
        class="page-arrow"
        disabled={currentPage === totalPages}
        on:click={() => goToPage(currentPage + 1)}
    >
        &gt;
    </button>
</div>