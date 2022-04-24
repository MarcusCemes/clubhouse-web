<script lang="ts">
    import { classes } from "$lib/utils";

    export let disabled = false;
    export let invalid = false;
    export let placeholder: string | undefined = undefined;
    export let value: string;

    /**
     * Synchronously removes invalid characters and converts
     * certain symbols before the browser has a chance to
     * repaint to make it seem like the input restricts
     * characters.
     */
    function sanitizeUsername() {
        value = value
            .toLowerCase()
            .replace(/[- ]/, "_")
            .replace(/[^A-Za-z0-9_.]/, "")
            .substring(0, 30);
    }
</script>

<input
    bind:value
    on:input={sanitizeUsername}
    class={classes(
        "px-6 py-2 pl-10 bg-white border-2 outline-none rounded-full focus:border-primary-500 focus:shadow-lg transition",
        value && invalid && "border-red-500"
    )}
    type="text"
    name="username"
    {placeholder}
    {disabled}
/>
