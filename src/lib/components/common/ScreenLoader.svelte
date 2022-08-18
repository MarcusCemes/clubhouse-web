<script lang="ts">
  import { fade } from "svelte/transition";

  import Centre from "$lib/components/common/Centre.svelte";
  import Loader from "$lib/components/common/Loader.svelte";
  import OnMount from "$lib/components/common/OnMount.svelte";
</script>

<OnMount delay={1000}>
  <Centre class="min-h-screen">
    <div in:fade|local class="flex select-none flex-col items-center text-gray-500">
      <Loader />
      <span class="mt-4 font-medium"><slot /></span>
    </div>
  </Centre>
</OnMount>
