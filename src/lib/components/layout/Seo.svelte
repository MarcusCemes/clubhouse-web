<script lang="ts">
    import { isTruthy } from "$lib/utils";

    const SEPARATOR = " – ";
    const suffix = "Clubhouse";
    const longName = "The unofficial EPFL community website";
    const description =
        "Clubhouse is the unofficial EPFL community website, a place for members to get together, share and discuss.";

    /* == Props == */

    export let title: string | string[] | undefined = undefined;

    /* == Computed == */

    $: computedTitle = calculateTitle(title);

    /* == Functions == */

    function calculateTitle(title?: string | string[]) {
        const partsArray = title ? [title].flat() : [longName];
        return [...partsArray, suffix].filter(isTruthy).join(SEPARATOR);
    }
</script>

<svelte:head>
    <title>{computedTitle}</title>
    <meta name="description" content={description} />
    <meta
        name="robots"
        content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
    />
</svelte:head>
