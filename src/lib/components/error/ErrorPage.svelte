<script lang="ts">
  import { Home } from "@steeze-ui/heroicons";
  import { Icon } from "@steeze-ui/svelte-icon";

  import Logo from "$lib/components/common/Logo.svelte";

  import ButtonPill from "../common/ButtonPill.svelte";

  export let status: string | number | undefined = undefined;
  export let message: string | undefined = undefined;
  export let stack: string | undefined = undefined;

  function statusCodeText(code: number): string {
    switch (code) {
      case 400:
        return "Bad Request";
      case 404:
        return "Not Found";
      case 500:
        return "Internal Server Error";
      case 502:
        return "Bad Gateway";
      default:
        return "";
    }
  }
</script>

<div class="flex min-h-screen flex-col items-center justify-center py-8 text-gray-700">
  <div class="w-full max-w-lg px-4">
    <div class="flex justify-center">
      <Logo class="mb-8 w-full px-4 md:w-64" />
    </div>

    {#if status === 404}
      <h1 class="mb-6 font-serif text-3xl font-semibold">Where are you off to?</h1>
      <p>
        We can't find what you're looking for. This page may have decided to take their mandatory
        break, or may be on holiday (and forgot to turn on their vacation auto-reply!). It's also
        possible that you may have mistyped something in the address bar?
      </p>

      <p class="mt-4 text-center text-xs">
        If you are contacted by a member of staff, show them these symbols: ✈️🌴🍹
      </p>
    {:else}
      <h1 class="mb-6 font-serif text-3xl font-semibold">Whoops!</h1>
      <p>
        Something broke. We knew we shouldn't have given our servers that much coffee... We have
        notified our expertly trained team of monkeys who will now continue to throw even more
        bananas at the problem.
      </p>

      <p class="mt-4 text-center text-xs">
        If you are contacted by a member of staff, show them these symbols: ☕🍌🔧
      </p>
    {/if}

    <div class="mt-4 flex flex-col items-center justify-center text-xs">
      {#if status}
        <code class="font-bold">
          {status}

          {#if typeof status === "number"}
            {statusCodeText(status)}
          {/if}
        </code>
      {/if}

      {#if message}
        <code class:mt-1={status}>
          {message}
        </code>
      {/if}
    </div>

    <div class="mt-10 flex justify-center">
      <ButtonPill
        href="/"
        class="inline-flex select-none items-center bg-gray-600 font-bold text-white transition-colors duration-100 hover:bg-gray-500"
      >
        <Icon src={Home} class="mr-2 h-5 w-5" theme="solid" />
        Go home
      </ButtonPill>
    </div>
  </div>

  {#if stack}
    <div class="mt-12 w-full max-w-4xl">
      <h2 class="mb-4 text-xl">Stack trace</h2>
      <pre class="w-full max-w-4xl overflow-x-scroll bg-white px-4 py-2">{stack}</pre>
    </div>
  {/if}
</div>
