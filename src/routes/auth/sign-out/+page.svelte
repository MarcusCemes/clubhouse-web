<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  import { apiSignOut } from "$lib/api/auth";
  import ScreenLoader from "$lib/components/common/ScreenLoader.svelte";

  onMount(async () => {
    await apiSignOut();
    goto("/");
  });
</script>

<ScreenLoader>Signing out</ScreenLoader>
