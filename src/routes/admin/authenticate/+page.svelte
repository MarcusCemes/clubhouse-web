<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  import { apiConfirmAccount } from "$lib/api/auth";
  import ScreenLoader from "$lib/components/common/ScreenLoader.svelte";
  import ErrorPage from "$lib/components/error/ErrorPage.svelte";
  import { setSession } from "$lib/stores/auth";

  import type { PageData } from "./$types";

  export let data: PageData;

  let badToken: string | boolean = false;

  $: status = typeof badToken === "string" ? badToken : undefined;

  onMount(async () => {
    const result = await apiConfirmAccount(data.token);

    switch (result.state) {
      case "SIGNED_IN":
        setSession({ state: result.state, data: result.data });
        goto("/");
        break;

      case "ERROR":
        badToken = result.data ?? true;
        break;
    }
  });
</script>

{#if !badToken}
  <ScreenLoader />
{:else}
  <ErrorPage {status} message="Token rejected by API" />
{/if}
