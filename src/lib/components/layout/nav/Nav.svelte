<script lang="ts">
    import { FORUM_URL } from "$lib/api/constants";
    import NavAuthentication from "./NavAuthentication.svelte";
</script>

<nav class="h-24 flex justify-center border-b">
    <div class="w-full max-w-5xl flex items-center">
        <a href="/" class="relative bottom-0.5 text-2xl font-bold select-none">
            🍻 Clubhouse
        </a>

        <span class="ml-12 inline-flex items-center font-semibold">
            <a href={FORUM_URL}>Forum</a>
        </span>

        <div class="flex-1" />
        <NavAuthentication />
    </div>
</nav>
