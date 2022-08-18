<script lang="ts">
  import { CheckCircle, Support } from "@steeze-ui/heroicons";
  import { Icon } from "@steeze-ui/svelte-icon";
  import { createEventDispatcher } from "svelte";
  import { derived, writable } from "svelte/store";
  import { fade, scale } from "svelte/transition";

  import { apiUsernameAvailable } from "$lib/api/auth";
  import { useBusy } from "$lib/hooks/useBusy";
  import { getSession, type AuthState } from "$lib/stores/auth";
  import { debounceImmediate } from "$lib/utils";

  import Loader from "../common/Loader.svelte";
  import Logo from "../common/Logo.svelte";
  import OnMount from "../common/OnMount.svelte";

  /* == Definitions == */

  const usernameRegex = /^(?!.*[._-]{2})[a-zA-Z0-9][a-zA-Z0-9._-]{2,28}[a-zA-Z0-9]$/;

  const dispatch = createEventDispatcher();
  const session = getSession();

  const [busy, withBusy] = useBusy();

  const debouncedUsername = writable("");
  const debouncedUpdateFunction = debounceImmediate(setDebouncedUsername, 500);

  const usernameAvailability = derived(debouncedUsername, checkUsernameAvailability);

  /* == Props == */

  export let disabled = false;

  /* == State == */

  let username = "";
  let dirty = false;

  /* == Derived state == */

  $: authState = $session;
  $: placeholderName = generatePlaceholder(authState);

  $: {
    dirty = true;
    username = sanitizeUsername(username);
  }

  $: usernameTooShort = username.length < 4;
  $: usernameValid = usernameRegex.test(username);
  $: usernameProblem = usernameTooShort || !usernameValid;

  $: if (!usernameProblem) debouncedUpdateFunction(username);

  $: showHint = username && (usernameProblem || $usernameAvailability === false);
  $: disableConfirm = disabled || $busy || dirty || usernameProblem || !$usernameAvailability;

  /* == Functions == */

  function generatePlaceholder(authState: AuthState) {
    return (
      (authState.state === "SIGNED_IN" && authState.data.last_name?.toLowerCase()) || "username"
    );
  }

  function setDebouncedUsername(username: string): void {
    debouncedUsername.set(username);
  }

  function checkUsernameAvailability(
    username: string,
    set: (available: boolean | null) => void
  ): void {
    if (!username) return;
    set(null);

    withBusy(async () =>
      apiUsernameAvailable(username)
        .then(set)
        .then(() => {
          dirty = false;
        })
        .catch(() => {
          /* */
        })
    );
  }

  /**
   * Synchronously removes invalid characters and converts
   * certain symbols before the browser has a chance to
   * repaint.
   */
  function sanitizeUsername(username: string): string {
    return username
      .toLowerCase()
      .replace(/[- ]/, "_")
      .replace(/[^A-Za-z0-9_.]/, "")
      .substring(0, 30);
  }

  /* == Events == */

  function onSubmit() {
    dispatch("accept", username);
  }
</script>

<div class="flex min-h-screen flex-col items-center justify-center">
  <OnMount>
    <form
      class="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
      transition:scale={{ start: 0.95 }}
      on:submit|preventDefault={onSubmit}
    >
      <div class="mb-6 flex justify-center">
        <Logo class="h-8" />
      </div>

      <h1 class="inline-flex items-center text-lg font-medium text-gray-900">
        We need a username before you continue
      </h1>

      <p class="mt-4 text-sm text-gray-500">
        Your new username will uniquely identify you on our platform. It's a short-hand that others
        can use to mention you.
      </p>

      <div class="mt-4 flex justify-center">
        <div class="relative">
          <div class="absolute top-0 left-6 bottom-0 flex items-center">@</div>
          <input
            class="rounded-full border p-2 pl-10 outline-none ring-orange-500 transition duration-100 focus:border-orange-500 focus:shadow-md focus:ring-1"
            type="text"
            bind:value={username}
            placeholder={placeholderName}
          />
        </div>
      </div>

      <div class="mt-1 text-center text-sm transition duration-100" class:opacity-0={!showHint}>
        {#if usernameTooShort}
          <span class="text-gray-500">Choose at least four characters</span>
        {:else if !usernameValid}
          <span class="text-red-500">That's not a valid username</span>
        {:else if $usernameAvailability === false}
          <span class="text-red-500">That username is already taken!</span>
        {:else}
          <span>&nbsp;</span>
        {/if}
      </div>

      <div class="mt-8 flex justify-end gap-x-2">
        <button
          type="button"
          class="inline-flex select-none items-center rounded-md px-4 py-2 text-sm font-semibold text-gray-600 transition duration-100 hover:bg-gray-200 active:bg-gray-300 disabled:cursor-not-allowed disabled:bg-transparent disabled:opacity-50"
          on:click={() => dispatch("reject")}
          {disabled}
        >
          <Icon src={Support} class="mr-2 h-5 w-5" />
          Take me to safety
        </button>

        <button
          class="relative inline-flex select-none items-center overflow-hidden rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition duration-100 hover:bg-orange-600 active:bg-orange-700 disabled:cursor-not-allowed disabled:bg-orange-500 disabled:opacity-50"
          disabled={disableConfirm}
        >
          <Icon src={CheckCircle} theme="solid" class="mr-2 h-5 w-5" />
          Validate

          {#if (usernameValid && dirty) || $busy || disabled}
            <div
              transition:fade={{ duration: 100 }}
              class="absolute inset-0 flex items-center justify-center bg-orange-500"
            >
              <Loader />
            </div>
          {/if}
        </button>
      </div>
    </form>
  </OnMount>
</div>
