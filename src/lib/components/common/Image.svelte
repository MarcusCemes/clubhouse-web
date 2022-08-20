<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";

  type GroupedFormats = { [index: string]: ImageMeta[] };

  export let alt: string;
  export let cover = false;
  export let image: ImageMeta[];

  let className: string | undefined = undefined;
  export { className as class };

  const dispatch = createEventDispatcher();

  let img: HTMLImageElement | undefined;
  let loaded = false;

  $: if (loaded) dispatch("load");
  $: src = getSource(image);
  $: srcsets = generateSrcsets(groupFormats(image));

  onMount(() => {
    if (img?.complete) loaded = true;
  });

  function getSource(image: ImageMeta[]): string | undefined {
    return image.at(-1)?.src;
  }

  function groupFormats(image: ImageMeta[]): GroupedFormats {
    const formats: GroupedFormats = {};

    for (const item of image) {
      const arr = formats[item.format] ?? [];
      arr.push(item);
      formats[item.format] = arr;
    }

    return formats;
  }

  function generateSrcsets(formats: GroupedFormats): [string, string][] {
    const srcsets: [string, string][] = [];

    for (const [format, images] of Object.entries(formats)) {
      srcsets.push([
        formatToMime(format),
        images.map((img) => `${img.src} ${img.width}w`).join(", "),
      ]);
    }

    return srcsets;
  }

  function formatToMime(format: string): string {
    switch (format) {
      case "jpg":
        return "image/jpeg";

      case "png":
        return "image/png";

      case "webp":
        return "image/webp";

      case "avif":
        return "image/avif";

      default:
        return "application/octet-stream";
    }
  }

  function onLoad() {
    loaded = true;
  }
</script>

<picture>
  {#each srcsets as [type, srcset]}
    <source {type} {srcset} />
  {/each}

  <img
    bind:this={img}
    on:load={onLoad}
    {alt}
    class={cover ? `${className} w-full h-full object-cover` : className}
    {src}
  />
</picture>
