<script lang="ts">
    import Logo from "$lib/components/common/Logo.svelte";
    import Link from "./FooterLink.svelte";

    const LINKS = [
        ["Home", "/"],
        ["Privacy", "/privacy"],
        ["FAQ", "/frequently-asked-questions"],
        ["Terms", "/terms-of-service"],
        ["Conduct", "/code-of-conduct"],
    ];
</script>

<footer class="mt-12 mb-8 flex justify-center md:mb-16">
    <div class="grid w-full max-w-5xl gap-y-8 md:grid-cols-2">
        <div class="flex flex-col items-center md:block">
            <Logo class="h-12" />
            <div class="mt-4 text-sm text-gray-500 md:mt-2 md:pl-14">
                An unofficial website for the EPFL community.
            </div>
        </div>

        <div class="flex items-center justify-center">
            <div class="inline-grid grid-cols-2 grid-rows-2 gap-x-12 gap-y-1">
                {#each LINKS as link}
                    <Link href={link[1]}>{link[0]}</Link>
                {/each}
            </div>
        </div>
    </div>
</footer>
