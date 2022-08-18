<script lang="ts">
  import Button from "./Button.svelte";

  export let disabled: boolean | undefined = undefined;
  export let href: string | undefined = undefined;
  let className = "";
  export { className as class };
</script>

<Button class={`px-6 py-3 rounded-full ${className}`} {disabled} {href} on:click><slot /></Button>
