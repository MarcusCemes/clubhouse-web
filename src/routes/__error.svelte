<script lang="ts" context="module">
    import { browser } from "$app/env";
    import Logo from "$lib/components/common/Logo.svelte";
    import { HomeIcon } from "svelte-feather-icons";
    import type { Load } from "./__error";

    export const load: Load = ({ error, status }) => ({
        props: {
            error,
            status,
        },
    });
</script>

<script lang="ts">
    export let status: number;
    export let error: Error;

    $: notFound = status === 404;

    if (browser) {
        console.error("Page error", error);
    }
</script>

<div
    class="flex min-h-screen flex-col items-center justify-center bg-stone-50 text-neutral-700"
>
    <div class="w-full max-w-lg px-4">
        <div class="flex justify-center">
            <Logo class="mb-8 w-full px-4 md:w-64" />
        </div>

        {#if notFound}
            <h1 class="mb-6 font-serif text-3xl font-semibold">
                Where are you off to?
            </h1>
            <p class="serif">
                We can't find what you're looking for. This page make have
                decided to take their mandatory break, or may be on holiday (and
                forgot to turn on their vacation auto-reply!). It's also
                possible that you may have mistyped something in the address
                bar?
            </p>

            <p class="mt-4 text-center text-xs">
                If you are contacted by a member of staff, show them these
                symbols: ✈️🌴🍹
            </p>
        {:else}
            <h1 class="mb-6 text-3xl font-serif font-semibold">Whoops!</h1>
            <p class="serif">
                Something broke. We knew we shouldn't have given our servers
                that much coffee... We have notified our expertly trained team
                of monkeys who will now continue to throw even more bananas at
                the problem.
            </p>

            <p class="mt-4 text-xs text-center">
                If you are contacted by a member of staff, show them these
                symbols: ☕🍌🔧
            </p>
        {/if}

        <div class="mt-4 flex justify-center">
            <code class="text-xs font-bold">
                {#if notFound}
                    404 Not Found
                {:else}
                    Status code {status}
                {/if}
            </code>
        </div>

        <div class="mt-10 flex justify-center">
            <a
                href="/"
                rel="button"
                class="inline-flex items-center rounded border-2 border-stone-500 px-4 py-2 font-semibold text-stone-600"
            >
                <HomeIcon size="1x" class="mr-1" /> Go home</a
            >
        </div>
    </div>

    {#if error.stack}
        <details class="mt-12 cursor-pointer">
            <summary>Stack trace</summary>
            <pre
                class="w-full max-w-4xl overflow-x-scroll bg-white px-4 py-2">{error.stack}</pre>
        </details>
    {/if}
</div>
