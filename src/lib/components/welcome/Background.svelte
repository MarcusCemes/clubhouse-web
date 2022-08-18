<script lang="ts">
  import epflImage from "$lib/assets/images/baptiste-gousset-epfl.jpg?width=1280;1920;3840&format=avif;webp;jpg&meta";
  import Image from "$lib/components/common/Image.svelte";

  const imageAuthor = "Baptiste Gousset";
</script>

<div class="absolute inset-0">
  <div class="pointer-events-none h-full w-full">
    <Image alt="EPFL building" cover image={epflImage} />
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
