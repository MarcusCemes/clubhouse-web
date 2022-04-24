<script lang="ts">
    import { classes } from "$lib/utils";
    import { fade } from "svelte/transition";
    import Loader from "../Loader.svelte";
    import ButtonElement from "./ButtonElement.svelte";

    let className: string | undefined = undefined;
    export { className as class };

    export let busy = false;
    export let centre = false;
    export let disabled = false;
    export let href: string | undefined = undefined;
    export let primary = false;
</script>

<ButtonElement
    on:click
    {disabled}
    class={classes(
        "relative px-3 py-1 transition duration-150 shadow-sm rounded-sm outline-none border ring-offset-1 select-none text-center lg:text-left",

        "hover:duration-75 focus:ring",

        "disabled:bg-neutral-200 disabled:text-neutral-500 disabled:border-transparent disabled:duration-300 disabled:cursor-not-allowed disabled:shadow-none",

        centre
            ? "inline-flex items-center justify-center lg:justify-start"
            : "inline-block",

        primary
            ? "border-transparent bg-primary-500 text-white hover:bg-primary-400 active:bg-primary-600 ring-primary-500"
            : "border-neutral-300 bg-white text-neutral-800 ring-neutral-300 hover:text-primary-500 hover:border-primary-500 active:bg-neutral-100",

        className
    )}
    {href}
>
    <slot />

    {#if busy}
        <span
            transition:fade|local={{ duration: 100 }}
            class={classes(
                "absolute inset-0 flex justify-center items-center transition",
                disabled
                    ? "bg-neutral-200 duration-300"
                    : primary
                    ? "bg-primary-500 duration-150"
                    : "bg-white duration-150"
            )}
        >
            <Loader />
        </span>
    {/if}
</ButtonElement>
