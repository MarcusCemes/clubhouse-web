<script lang="ts">
    import { getStores } from "$app/stores";
    import { actionSignIn, actionSignOut } from "$lib/actions/auth";
    import Button from "$lib/components/common/button/Button.svelte";
    import { useBusy } from "$lib/hooks/useBusy";
    import type { AuthState } from "$lib/stores/auth";
    import type { SvelteComponent } from "svelte";
    import {
        AlertTriangleIcon,
        CloudOffIcon,
        LogOutIcon,
        UserIcon,
    } from "svelte-feather-icons";

    const { session } = getStores();
    $: user = $session.user;

    const [isAction, withAction] = useBusy();

    $: [icon, text, primary, href] = buttonTextIcon(user);

    /** Returns the icon, button text, primary boolean and href. */
    function buttonTextIcon(
        auth: AuthState
    ): [typeof SvelteComponent, string, boolean, string?] {
        switch (auth.state) {
            case "SIGNED_IN":
                return [LogOutIcon, "Sign out", false];

            case "SIGNED_OUT":
                return [UserIcon, "Sign in", false];

            case "CONFIRM_ACCOUNT":
                return [AlertTriangleIcon, "Confirm account", true, "/welcome"];

            case "ERROR":
                return [CloudOffIcon, "Sign-in unavailable", false];
        }
    }

    async function onClick() {
        switch (user.state) {
            case "SIGNED_OUT":
                await withAction(async () => await actionSignIn(session));
                break;

            case "SIGNED_IN":
                await withAction(async () => await actionSignOut(session));
                break;
        }
    }
</script>

{#if user.state === "SIGNED_IN"}
    <div class="mr-4 inline-flex items-center rounded border px-4 py-2">
        <UserIcon size="1x" class="mr-1" />
        {user.data.first_name}
        {user.data.last_name}
    </div>
{/if}

{#if user.state === "ERROR"}
    <div class="inline-flex select-none items-center text-neutral-400">
        <svelte:component this={icon} class="mr-2" size="1x" />
        {text}
    </div>
{:else}
    <Button
        on:click={onClick}
        {primary}
        {href}
        disabled={$isAction}
        busy={$isAction}
        centre
    >
        <svelte:component this={icon} class="mr-1" size="1x" />
        {text}
    </Button>
{/if}
