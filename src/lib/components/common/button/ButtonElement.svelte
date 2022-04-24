<script lang="ts">
    let className: string | undefined = undefined;
    export { className as class };

    export let disabled = false;
    export let href: string | undefined = undefined;
</script>

{#key "button"}
    {#if href && !disabled}
        <a on:click class={className} {disabled} {href}><slot /></a>
    {:else}
        <button on:click class={className} {disabled}><slot /></button>
    {/if}
{/key}
