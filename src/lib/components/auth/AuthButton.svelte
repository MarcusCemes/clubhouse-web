<script lang="ts">
  export let fade: boolean;
</script>

<div
  class="flex w-60 items-center justify-center rounded-sm border border-gray-500 px-4 py-2 font-semibold"
  class:opacity-50={fade}
>
  <slot />
</div>
