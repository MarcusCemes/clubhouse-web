<script lang="ts">
  import { Annotation } from "@steeze-ui/heroicons";
  import { Icon } from "@steeze-ui/svelte-icon";

  import Logo from "$lib/components/common/Logo.svelte";
  import { FORUM_URL } from "$lib/constants";

  import AuthStatus from "../auth/AuthStatus.svelte";
</script>

<nav class="mb-4 flex justify-center md:mb-0 md:h-32">
  <div class="flex w-full max-w-4xl flex-col items-center md:flex-row">
    <a
      href="/"
      class="select-none pt-8 pb-6 text-2xl font-bold md:relative md:bottom-0.5 md:pt-0 md:pb-0"
    >
      <Logo class="h-12" />
    </a>

    <span
      class="mb-4 inline-flex flex-1 items-center font-semibold md:mb-0 md:ml-8 md:justify-start"
    >
      <a class="inline-flex items-center text-gray-800 hover:text-gray-500" href={FORUM_URL}>
        <Icon src={Annotation} class="mr-2 h-5 w-5" />
        Forum
      </a>
    </span>

    <div class="pr-28">
      <AuthStatus />
    </div>
  </div>
</nav>
