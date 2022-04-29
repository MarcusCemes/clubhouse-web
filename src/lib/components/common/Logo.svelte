<script lang="ts">
    import src from "$lib/assets/logo/clubhouse.svg";
    import { classes } from "$lib/utils";

    let className: string | undefined = undefined;
    export { className as class };
</script>

<img
    {src}
    class={classes("pointer-events-none select-none", className)}
    alt="CLubhouse logo"
/>
