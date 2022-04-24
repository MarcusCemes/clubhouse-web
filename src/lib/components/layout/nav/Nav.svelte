<script lang="ts">
    import { authStore } from "$lib/stores/auth";
    import NavAuthentication from "./NavAuthentication.svelte";

    const LINK = "/";
    const FORUM_LINK = "https://clubhouse.mastermovies.uk";

    $: authState = $authStore;
</script>

<nav class="h-24 flex justify-center border-b">
    <div class="w-full max-w-5xl flex items-center">
        <a
            href={LINK}
            class="relative bottom-0.5 text-2xl font-bold select-none"
            >🍻 Clubhouse</a
        >

        <span class="ml-12 inline-flex items-center font-semibold">
            <a href={FORUM_LINK}>Forum</a>
        </span>

        <div class="flex-1" />
        <NavAuthentication {authState} />
    </div>
</nav>
