<script lang="ts">
  import { MenuButton } from "@rgossiaux/svelte-headlessui";
</script>

<MenuButton
  class="flex h-12 w-48 items-center justify-center rounded-md bg-transparent font-semibold transition-colors duration-100 hover:bg-gray-200 focus-visible:ring-2 focus-visible:ring-gray-500 active:bg-gray-300"
  on:click
>
  <slot />
</MenuButton>
