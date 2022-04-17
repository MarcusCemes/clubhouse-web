<script lang="ts">
    import { classes } from "$lib/utils";

    let className: string | undefined = undefined;
    export { className as class };

    export let noMargin = false;
</script>

<h2 class={classes("text-3xl font-bold", !noMargin && "mb-2", className)}>
    <slot />
</h2>
