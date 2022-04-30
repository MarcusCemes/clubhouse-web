<script lang="ts">
    import { goto } from "$app/navigation";
    import { getStores } from "$app/stores";
    import { actionSignOut } from "$lib/actions/auth";
    import Button from "$lib/components/common/button/Button.svelte";
    import Link from "$lib/components/common/Link.svelte";
    import { useTimeout } from "$lib/hooks/useTimeout";
    import classes from "$lib/styles.module.css";
    import {
        CheckSquareIcon,
        CompassIcon,
        HelpCircleIcon,
    } from "svelte-feather-icons";

    const { session } = getStores();

    const BUTTON_DELAY_MS = 6000;

    let actionRunning = false;
    let loadTimeout = false;

    $: disabled = !loadTimeout || actionRunning;

    useTimeout(() => {
        loadTimeout = true;
    }, BUTTON_DELAY_MS);

    async function cancel() {
        actionRunning = true;
        try {
            await actionSignOut(session);
            goto("/");
        } catch {
            actionRunning = false;
        }
    }
</script>

<div class="w-full max-w-xl rounded-md border bg-white px-12 py-8 shadow-lg">
    <div class="mb-12 select-none text-lg font-bold">🍻 Clubhouse</div>

    <h1 class="text-4xl font-bold">
        <span class={classes.handWave}>👋</span> Welcome
    </h1>

    <p class="mt-8">
        We noticed that this is your <strong
            >first time connecting to Clubhouse</strong
        >.
    </p>

    <p class="mt-2">
        In order to use Clubhouse, we need to store some information about you,
        such as your name and email. We do <strong
            >not store or have access to your password or any sensitive
            information</strong
        >.
    </p>

    <p class="mt-2">
        You can close your account at any time by contacting us by email, any
        historical data such as forum posts will be anonymised.
    </p>

    <p class="mt-6">
        By clicking "I accept", you agree to our <Link
            href="/privacy"
            newTab
            newTabIcon>Privacy Policy</Link
        > and our <Link href="/terms-of-service" newTab newTabIcon
            >Terms of Service</Link
        >.
    </p>

    <div class="mt-12 flex flex-col justify-end gap-y-4 gap-x-6 lg:flex-row">
        <Link class="font-semibold" href="/frequently-asked-questions" newTab>
            <HelpCircleIcon size="1x" slot="left" />
            Learn more
        </Link>

        <span class="flex-1" />
        <Button on:click={cancel} centre {disabled}>
            <CompassIcon class="mr-1" size="1x" />Take me to safety</Button
        >

        <Button
            href="/welcome/choose-username"
            centre
            {disabled}
            busy={actionRunning}
            primary
        >
            <CheckSquareIcon class="mr-2" size="1x" /> I accept</Button
        >
    </div>
</div>
