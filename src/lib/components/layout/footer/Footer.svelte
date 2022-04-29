<script lang="ts">
    import Logo from "$lib/components/common/Logo.svelte";
    import Link from "./FooterLink.svelte";

    const LINKS = [
        ["Home", "/"],
        ["Terms", "/terms-of-service"],
        ["FAQ", "/frequently-asked-questions"],
        ["Privacy", "/privacy"],
        ["Conduct", "/code-of-conduct"],
    ];
</script>

<footer class="mt-4 py-8 flex justify-center border-t">
    <div class="w-full max-w-5xl grid grid-cols-2">
        <div>
            <Logo class="h-12" />
            <div class="mt-2 pl-14 text-gray-500 text-sm">
                An unofficial website for the EPFL community.
            </div>
        </div>

        <div class="flex justify-center items-center">
            <div class="inline-grid grid-cols-2 grid-rows-2 gap-x-12 gap-y-1">
                {#each LINKS as link}
                    <Link href={link[1]}>{link[0]}</Link>
                {/each}
            </div>
        </div>
    </div>
</footer>
