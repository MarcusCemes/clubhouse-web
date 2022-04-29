<script lang="ts">
    import { FORUM_URL } from "$lib/api/constants";
    import Logo from "$lib/components/common/Logo.svelte";
    import NavAuthentication from "$lib/components/layout/nav/NavAuthentication.svelte";
    import Seo from "$lib/components/layout/Seo.svelte";
    import { MessageSquareIcon } from "svelte-feather-icons";
</script>

<Seo />

<div
    class="grid min-h-screen grid-flow-row grid-rows-[1fr_auto_1fr] bg-stone-50 px-4"
>
    <div class="flex justify-center">
        <div
            class="flex h-32 w-full max-w-3xl items-center justify-center md:justify-end"
        >
            <NavAuthentication />
        </div>
    </div>

    <div class="flex select-none flex-col items-center justify-center">
        <Logo class="h-auto w-full px-8 md:h-28 md:w-auto md:px-0" />

        <span class="mt-2 font-semibold text-stone-500"
            >An unofficial website for the EPFL community.
        </span>

        <div
            class="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-2 text-stone-400"
        >
            <a class="hover:text-stone-600" href="/about">About</a>
            <span>&bull;</span>
            <a class="hover:text-stone-600" href="/frequently-asked-questions"
                >FAQ</a
            >
            <span>&bull;</span>
            <a class="hover:text-stone-600" href="/code-of-conduct">Conduct</a>
            <span>&bull;</span>
            <a class="hover:text-stone-600" href="/privacy">Privacy</a>
            <span>&bull;</span>
            <a class="hover:text-stone-600" href="/terms-of-service">Terms</a>
        </div>

        <div class="mt-12">
            <a
                class="inline-flex items-center rounded-full bg-orange-600 px-6 py-3 font-bold text-white transition-colors duration-75 hover:bg-orange-500"
                href={FORUM_URL}
            >
                <MessageSquareIcon class="mr-2" size="1x" strokeWidth={3} />
                Forum
            </a>
        </div>
    </div>

    <div />
</div>
