<script lang="ts">
  import { fade } from "svelte/transition";

  import epflImage from "$lib/assets/images/baptiste-gousset-epfl.jpg?width=1280;1920;3840&format=avif;webp;jpg&meta";
  import EpflImagePreview from "$lib/assets/images/baptiste-gousset-epfl.svelte";
  import Image from "$lib/components/common/Image.svelte";
  import { classes } from "$lib/utils";

  const imageAuthor = "Baptiste Gousset";

  let loaded = false;
</script>

{#if !loaded}
  <div out:fade={{ delay: 1000 }} class="absolute inset-0">
    <EpflImagePreview class="h-full w-full" />
  </div>
{/if}

<div class="absolute inset-0">
  <div class="pointer-events-none h-full w-full">
    <Image
      alt="EPFL building"
      cover
      image={epflImage}
      class={classes("transition-opacity duration-200", !loaded && "opacity-0")}
      on:load={() => (loaded = true)}
    />
  </div>

  <div class="absolute inset-0 bg-black bg-opacity-60" />

  <a
    class="absolute bottom-4 right-4 text-sm text-white text-opacity-50 transition-colors duration-100 hover:text-opacity-90"
    href="https://unsplash.com/@bapt_g"
    target="_blank"
  >
    Photo by {imageAuthor}
  </a>
</div>
