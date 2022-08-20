<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  import { apiSignInComplete } from "$lib/api/auth";
  import ScreenLoader from "$lib/components/common/ScreenLoader.svelte";
  import ErrorPage from "$lib/components/error/ErrorPage.svelte";
  import { setSession } from "$lib/stores/auth";

  import type { PageData } from "./$types";

  export let data: PageData;

  let badKey = false;

  onMount(async () => {
    const result = await apiSignInComplete(data.key, data.authCheck);

    switch (result.code) {
      case "SIGNED_IN":
        setSession({ state: result.code, data: result.user });
        goto(data.then, { replaceState: true });
        break;

      case "CONFIRM_ACCOUNT":
        setSession({ state: result.code, data: { token: result.token, then: data.then } });
        goto("/welcome", { replaceState: true });
        break;

      case "E_BAD_KEY":
        badKey = true;
        break;
    }
  });
</script>

{#if !badKey}
  <ScreenLoader />
{:else}
  <ErrorPage status="E_BAD_KEY" message="The key is invalid or has expired" />
{/if}
