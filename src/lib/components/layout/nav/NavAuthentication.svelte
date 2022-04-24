<script lang="ts">
    import Button from "$lib/components/common/button/Button.svelte";
    import type { AuthState } from "$lib/stores/auth";
    import type { SvelteComponent } from "svelte";
    import {
        AlertTriangleIcon,
        LogOutIcon,
        MehIcon,
        UserIcon,
    } from "svelte-feather-icons";

    export let authState: AuthState;

    let runningAction = false;

    $: [icon, text, primary, href] = buttonTextIcon(authState);

    $: disabled =
        ["CHECKING", "ERROR"].includes(authState.state) || runningAction;
    $: busy = authState.state === "CHECKING" || runningAction;

    function buttonTextIcon(
        auth: AuthState
    ): [typeof SvelteComponent, string, boolean, string | undefined] {
        switch (auth.state) {
            case "SIGNED_IN":
                return [LogOutIcon, "Sign out", false, "/sign-out"];

            case "SIGNED_OUT":
                return [UserIcon, "Sign in", false, "/sign-in"];

            case "CONFIRM_ACCOUNT":
                return [AlertTriangleIcon, "Confirm account", true, "/welcome"];

            case "CHECKING":
                return [UserIcon, "Sign in", false, undefined];

            case "ERROR":
                return [
                    MehIcon,
                    "Authentication unavailable",
                    false,
                    undefined,
                ];
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

<Button {primary} {href} {busy} {disabled} centre>
    <svelte:component this={icon} class="mr-1" size="1x" />
    {text}
</Button>
