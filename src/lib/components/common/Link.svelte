<script lang="ts">
    import { classes, ifThen } from "$lib/utils";
    import { ExternalLinkIcon } from "svelte-feather-icons";

    let className: string | undefined = undefined;
    export { className as class };

    export let external = false;
    export let newTab = false;
    export let newTabIcon = false;
    export let href: string;
</script>

<a
    {href}
    class={classes(
        "text-primary-500",
        (newTabIcon || $$slots.left || $$slots.right) &&
            "inline-flex items-center",
        className
    )}
    target={ifThen(newTab, "_blank")}
    rel={ifThen(external, "external")}
>
    {#if $$slots.left}
        <span class="mr-1">
            <slot name="left" />
        </span>
    {/if}

    <slot />

    {#if newTabIcon}
        <ExternalLinkIcon class="ml-1" size="1x" />
    {/if}

    {#if $$slots.right}
        <span class="ml-1">
            <slot name="right" />
        </span>
    {/if}
</a>
