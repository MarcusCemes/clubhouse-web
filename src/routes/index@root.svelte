<script lang="ts">
    import { FORUM_URL } from "$lib/api/constants";
    import Logo from "$lib/components/common/Logo.svelte";
    import NavAuthentication from "$lib/components/layout/nav/NavAuthentication.svelte";
    import Seo from "$lib/components/layout/Seo.svelte";
    import { MessageSquareIcon } from "svelte-feather-icons";
</script>

<Seo />

<div
    class="min-h-screen px-4 grid grid-rows-[1fr_auto_1fr] grid-flow-row bg-stone-50"
>
    <div class="flex justify-center">
        <div
            class="w-full max-w-3xl h-32 flex justify-center md:justify-end items-center"
        >
            <NavAuthentication />
        </div>
    </div>

    <div class="flex flex-col justify-center items-center select-none">
        <Logo class="px-8 w-full h-auto md:px-0 md:w-auto md:h-28" />

        <span class="mt-2 text-stone-500 font-semibold"
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
                class="px-6 py-3 inline-flex items-center bg-orange-600 text-white font-bold rounded-full transition-colors duration-75 hover:bg-orange-500"
                href={FORUM_URL}
            >
                <MessageSquareIcon class="mr-2" size="1x" strokeWidth={3} />
                Forum
            </a>
        </div>
    </div>

    <div />
</div>
