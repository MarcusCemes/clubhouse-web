<script lang="ts">
  import { browser, dev } from "$app/env";
  import { page } from "$app/stores";

  import ErrorPage from "$lib/components/error/ErrorPage.svelte";

  $: if (browser) {
    console.error("Application error:");
    console.error($page.error);
  }
</script>

<ErrorPage
  status={$page.status}
  message={$page.error.message}
  stack={dev ? $page.error.stack : undefined}
/>
