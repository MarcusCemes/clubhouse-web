<script lang="ts">
    import Button from "$lib/components/common/button/Button.svelte";
    import Link from "$lib/components/common/Link.svelte";
    import Seo from "$lib/components/layout/Seo.svelte";
    import { useTimeout } from "$lib/hooks/useTimeout";
    import { handWave } from "$lib/styles.module.css";
    import {
        ArrowLeftIcon,
        CheckSquareIcon,
        HelpCircleIcon,
    } from "svelte-feather-icons";

    let confirming = false;
    let loadTimeout = false;

    $: disabled = !loadTimeout || confirming;

    useTimeout(() => {
        loadTimeout = true;
    }, 4000);

    function onAccept() {
        confirming = true;
    }
</script>

<Seo title="Account creation" />

<div
    class="min-h-screen p-2 flex flex-col justify-center items-center bg-gradient-to-tr from-[#FFC371] to-[#FF5F6D]"
>
    <div
        class="w-full max-w-xl bg-white border px-12 py-8 rounded-md shadow-lg"
    >
        <div class="mb-12 text-lg font-bold select-none">🍻 Clubhouse</div>

        <h1 class="mb-8 text-4xl font-bold">
            <span class={handWave}>👋</span> Welcome
        </h1>

        <p>
            We noticed that this is your <strong
                >first time connecting to Clubhouse</strong
            >.
        </p>

        <p class="mt-2">
            In order to use Clubhouse, we need to store some information about
            you, such as your name and email. We do <strong
                >not store or have access to your password or any sensitive
                information</strong
            >.
        </p>

        <p class="mt-2">
            You can close your account at any time by contacting us by email,
            any historical data such as forum posts will be anonymised.
        </p>

        <p class="mt-6">
            By clicking "I accept", you agree to our <Link
                href="/privacy"
                newTab
                newTabIcon>Privacy Policy</Link
            > and our <Link href="/tos" newTab newTabIcon>Terms of Service</Link
            >. You can
        </p>

        <div
            class="mt-12 flex flex-col lg:flex-row justify-end gap-y-4 gap-x-6"
        >
            <Link class="font-semibold" href="/faq" newTab>
                <HelpCircleIcon size="1x" slot="left" />
                Learn more
            </Link>

            <span class="flex-1" />
            <Button href="/" centre {disabled}>
                <ArrowLeftIcon class="mr-1" size="1x" /> Go back</Button
            >

            <Button
                on:click={onAccept}
                centre
                {disabled}
                busy={confirming}
                primary
            >
                <CheckSquareIcon class="mr-2" size="1x" /> I accept</Button
            >
        </div>
    </div>
</div>
