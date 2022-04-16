<script lang="ts">
    import { UserIcon } from "svelte-feather-icons";

    const LINK = "https://clubhouse.epfl.ch";
</script>

<nav class="h-24 flex justify-center border-b">
    <div class="w-full max-w-5xl flex items-center">
        <a href={LINK} class="text-2xl font-bold select-none">🍻 Clubhouse</a>
        <div class="flex-1" />
        <a
            href="/sign-in"
            class="px-4 py-2 flex items-center border bg-red-600 text-white rounded font-semibold hover:bg-red-500 transition-colors duration-75 select-none"
        >
            <UserIcon size="1x" class="mr-1" /> Sign-in
        </a>
    </div>
</nav>
