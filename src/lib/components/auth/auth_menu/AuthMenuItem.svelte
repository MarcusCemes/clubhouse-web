<script lang="ts">
  import { MenuItem } from "@rgossiaux/svelte-headlessui";

  export let href: string | undefined = undefined;
  export let activeColour = "bg-gray-200 active:bg-gray-300";
</script>

<MenuItem let:active>
  <svelte:element
    this={href ? "a" : "button"}
    on:click
    {href}
    class={`w-full flex rounded-md items-center px-2 py-2 text-sm transition-colors duration-100 ${
      active ? activeColour : ""
    }`}
  >
    <slot />
  </svelte:element>
</MenuItem>
