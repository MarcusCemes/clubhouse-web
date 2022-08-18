<script lang="ts">
  import { CheckCircle, Support } from "@steeze-ui/heroicons";
  import { Icon } from "@steeze-ui/svelte-icon";
  import { createEventDispatcher } from "svelte";
  import { fade, scale } from "svelte/transition";

  import { useSequence } from "$lib/hooks/useSequence";

  import Logo from "../common/Logo.svelte";
  import HandWave from "./HandWave.svelte";
  import Link from "./Link.svelte";
  import { punchHole } from "./punchHole";
  import styles from "./punchHole.module.css";

  export let disabled: boolean;
  export let show: boolean;

  const dispatch = createEventDispatcher();

  enum Stages {
    Ready,
    Intro,
    IntroHide,
    Background,
    Menu,
  }

  const sequence = useSequence(
    [
      { tag: Stages.Intro, rel: 200 },
      { tag: Stages.IntroHide, rel: 2500 },
      { tag: Stages.Background, rel: 400 },
      { tag: Stages.Menu, rel: 800 },
    ],
    Stages.Ready
  );
</script>

<div class="relative flex min-h-screen items-center justify-center">
  <!-- Background cut-out animation -->
  {#if $sequence <= Stages.IntroHide}
    <div
      out:punchHole={{ duration: 1200 }}
      class={`absolute inset-0 bg-white ${styles.punchHole}`}
    />
  {/if}

  <!-- Welcome text and hand wave animation-->
  {#if $sequence === Stages.Intro}
    <div transition:fade class="relative flex select-none items-center text-4xl font-light">
      <HandWave />
      <span class="ml-2">Hello!</span>
    </div>
  {/if}

  <!-- Modal dialogue box with text -->
  {#if $sequence === Stages.Menu && show}
    <div
      class="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
      transition:scale={{ start: 0.95 }}
    >
      <div class="mb-6 flex justify-center">
        <Logo class="h-8" />
      </div>

      <h1 class="inline-flex items-center text-lg font-medium text-gray-900">
        Welcome to Clubhouse
      </h1>

      <p class="mt-4 text-sm text-gray-500">
        This is your first time signing-in to Clubhouse. In order to use Clubhouse, we need to store
        some information about you such as your name and email.
      </p>

      <p class="mt-4 text-sm text-gray-500">
        We do <span class="font-semibold">
          not store or have access to your password or any sensitive information
        </span>.
      </p>

      <p class="mt-4 text-sm text-gray-500">
        By clicking "I accept", you agree to our <Link href="/privacy">Privacy Policy</Link> and our
        <Link href="/terms-of-service">Terms of Service</Link>.
      </p>

      <div class="mt-8 flex justify-end gap-x-2">
        <button
          class="inline-flex select-none items-center rounded-md px-4 py-2 text-sm font-semibold text-gray-600 transition-colors duration-100 hover:bg-gray-200 active:bg-gray-300 disabled:cursor-not-allowed disabled:bg-transparent disabled:opacity-50"
          on:click={() => dispatch("reject")}
          {disabled}
        >
          <Icon src={Support} class="mr-2 h-5 w-5" />
          Take me to safety
        </button>

        <button
          type="submit"
          class="inline-flex select-none items-center rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition-colors duration-100 hover:bg-orange-600 active:bg-orange-700 disabled:cursor-not-allowed disabled:bg-orange-500 disabled:opacity-50"
          on:click={() => dispatch("accept")}
          {disabled}
        >
          <Icon src={CheckCircle} theme="solid" class="mr-2 h-5 w-5" />
          I accept
        </button>
      </div>
    </div>
  {/if}
</div>
