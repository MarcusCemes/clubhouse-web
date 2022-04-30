<script lang="ts">
    import { browser } from "$app/env";
    import { goto } from "$app/navigation";
    import { getStores } from "$app/stores";
    import { actionConfirmAccount } from "$lib/actions/auth";
    import { apiCheckUsername } from "$lib/api/auth";
    import Button from "$lib/components/common/button/Button.svelte";
    import UsernameInput from "$lib/components/pages/welcome/UsernameInput.svelte";
    import { classes, debounceImmediate, getCookie } from "$lib/utils";
    import { onMount } from "svelte";
    import { ArrowLeftIcon, CheckCircleIcon } from "svelte-feather-icons";

    const { session } = getStores();

    let submitting = false;
    let suggestion = "";
    let username = "";

    $: placeholder = `the_real_${suggestion || "deal"}`;
    $: pending = username.length >= 4;
    $: validate(username);

    let valid: "valid" | "invalid" | "error" | null = null;

    onMount(() => {
        if (browser) suggestion = username = fetchSuggestion();
    });

    const validate = debounceImmediate(async (usernameToCheck: string) => {
        try {
            if (!/[A-Za-z0-9_.]{4,30}/.test(usernameToCheck)) {
                valid = null;
                return;
            }
            const available = await apiCheckUsername(usernameToCheck);
            if (username !== usernameToCheck) return;

            pending = false;
            valid = available ? "valid" : "invalid";
        } catch (error) {
            console.error("Could not check username availability", { error });
            valid = "error";
        }
    }, 500);

    function fetchSuggestion(): string {
        if (!browser) return "";

        try {
            const cookie = getCookie("clubhouse_account_confirm_attributes");
            if (!cookie) return "";

            const footer = cookie.split(".")[3];
            if (!footer) return "";

            const parsed = JSON.parse(window.atob(footer));
            return parsed.suggest || "";
        } catch (err) {
            return "";
        }
    }

    async function submit() {
        submitting = true;
        (await actionConfirmAccount(session, true, username)) && goto("/");
    }
</script>

<div class="w-full max-w-xl rounded-md border bg-white px-12 py-8 shadow-lg">
    <div class="mb-12 select-none text-lg font-bold">🍻 Clubhouse</div>

    <h1 class="text-4xl font-bold">Choose your #GamerTag</h1>

    <p class="mt-8">
        Or as the cool kids say, your <strong>Clubhouse username</strong>.
    </p>

    <div class="mt-8 flex flex-col items-center">
        <div>
            <span class="relative">
                <span
                    class="pointer-events-none absolute top-0 left-6 bottom-0 flex items-center"
                >
                    &commat;
                </span>

                <UsernameInput bind:value={username} {placeholder} />
            </span>

            <div
                class={classes(
                    "h-8 flex justify-center items-center text-sm font-semibold",
                    !valid
                        ? "opacity-0"
                        : valid === "valid"
                        ? "text-green-500"
                        : "text-red-500"
                )}
            >
                {valid === "valid"
                    ? "😃 That username is available!"
                    : valid === "invalid"
                    ? "😟 That username is taken!"
                    : "🤕 An error occurred."}
            </div>
        </div>
    </div>

    <p class="mt-2">
        It's not really that important, we mainly use our full names around
        here. If you can't think of a good one, don't worry, you can always
        change it later!
    </p>

    <div class="mt-12 flex flex-col justify-end gap-y-4 gap-x-6 lg:flex-row">
        <span class="flex-1" />
        <Button href="./" centre disabled={submitting}>
            <ArrowLeftIcon class="mr-1" size="1x" />
            Go back
        </Button>

        <Button
            on:click={submit}
            centre
            primary
            disabled={pending || valid !== "valid" || submitting}
            busy={pending || submitting}
        >
            <CheckCircleIcon class="mr-2" size="1x" />
            Perfect
        </Button>
    </div>
</div>
