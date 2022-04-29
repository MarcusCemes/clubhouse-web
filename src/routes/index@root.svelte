<script lang="ts">
    import Logo from "$lib/assets/logo/clubhouse.svg";
    import NavAuthentication from "$lib/components/layout/nav/NavAuthentication.svelte";
    import Seo from "$lib/components/layout/Seo.svelte";
    import { MessageSquareIcon } from "svelte-feather-icons";
</script>

<Seo />

<div
    class="min-h-screen grid grid-rows-[1fr_auto_1fr] grid-flow-row bg-stone-50"
>
    <div class="flex justify-center">
        <div class="w-full max-w-3xl h-32 flex justify-end items-center">
            <NavAuthentication />
        </div>
    </div>

    <div class="flex flex-col justify-center items-center select-none">
        <img src={Logo} class="h-28" alt="Clubhouse logo" />

        <span class="mt-2 text-stone-500 font-semibold"
            >An unofficial website for the EPFL community.
        </span>

        <div class="mt-8 flex gap-x-4 text-stone-400">
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
                href="https://forum.clubhouse.mastermovies.uk"
            >
                <MessageSquareIcon class="mr-2" size="1x" strokeWidth={3} />
                Forum
            </a>
        </div>
    </div>

    <div />
</div>
