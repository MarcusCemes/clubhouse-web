<script lang="ts">
    import { classes } from "$lib/utils";

    let className: string | undefined = undefined;
    export { className as class };

    export let marginTop = false;
</script>

<div
    class={classes(
        "flex flex-col items-center",
        marginTop && "mt-8",
        className
    )}
>
    <div class="w-full max-w-5xl">
        <slot />
    </div>
</div>
