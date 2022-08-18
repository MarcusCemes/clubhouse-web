<script lang="ts">
  export let disabled: boolean | undefined = undefined;
  export let href: string | undefined = undefined;
  let className: string | undefined = undefined;
  export { className as class };
</script>

{#if href}
  <a {href}><button class={className} {disabled} tabindex="-1"><slot /></button></a>
{:else}
  <button class={className} {disabled} on:click><slot /></button>
{/if}
