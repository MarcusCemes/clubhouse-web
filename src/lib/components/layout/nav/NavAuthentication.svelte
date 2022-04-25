<script lang="ts">
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

    export let authState: AuthState;

    const [isAction, withAction] = useBusy();

    $: [icon, text, primary, href] = buttonTextIcon(authState) ?? [];
    $: disabled = ["CHECKING", "ERROR"].includes(authState.state) || $isAction;
    $: busy = authState.state === "CHECKING" || $isAction;

    /** Returns the icon, button text, primary boolean and href. */
    function buttonTextIcon(
        auth: AuthState
    ): [typeof SvelteComponent, string, boolean, string?] | null {
        switch (auth.state) {
            case "SIGNED_IN":
                return [LogOutIcon, "Sign out", false];

            case "SIGNED_OUT":
                return [UserIcon, "Sign in", false];

            case "CONFIRM_ACCOUNT":
                return [AlertTriangleIcon, "Confirm account", true, "/welcome"];

            case "CHECKING":
                return null;

            case "ERROR":
                return [CloudOffIcon, "Unavailable", false];
        }
    }

    async function onClick() {
        switch (authState.state) {
            case "SIGNED_OUT":
                await withAction(async () => await actionSignIn());
                break;

            case "SIGNED_IN":
                await withAction(async () => await actionSignOut());
                break;
        }
    }
</script>

{#if authState.state === "SIGNED_IN"}
    <div class="mr-4 px-4 py-2 inline-flex items-center border rounded">
        <UserIcon size="1x" class="mr-1" />
        {authState.data.first_name}
        {authState.data.last_name}
    </div>
{/if}

{#if text}
    <Button on:click={onClick} {primary} {href} {busy} {disabled} centre>
        <svelte:component this={icon} class="mr-1" size="1x" />
        {text}
    </Button>
{/if}
