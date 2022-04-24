<script lang="ts">
    import { browser } from "$app/env";
    import { actionSignOut } from "$lib/actions/auth";
    import { onMount } from "svelte";

    onMount(async () => {
        if (browser) {
            await actionSignOut();
        }
    });
</script>
