<script lang="ts">
  import { onMount } from "svelte";

  export let delay: number | undefined = undefined;

  let mounted = false;

  onMount(() => {
    if (delay) {
      const ref = setTimeout(() => {
        mounted = true;
      }, delay);
      return () => clearTimeout(ref);
    } else {
      mounted = true;
    }
  });
</script>

{#if mounted}
  <slot />
{/if}
