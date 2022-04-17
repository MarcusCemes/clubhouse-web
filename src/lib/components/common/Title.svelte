<script lang="ts">
    import { classes } from "$lib/utils";

    let className: string | undefined = undefined;
    export { className as class };

    export let noMargin = false;
</script>

<h1 class={classes("text-4xl font-bold", !noMargin && "mb-8", className)}>
    <slot />
</h1>
