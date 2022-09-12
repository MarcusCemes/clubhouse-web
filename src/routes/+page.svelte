<script lang="ts">
  import { Annotation } from "@steeze-ui/heroicons";
  import { Icon } from "@steeze-ui/svelte-icon";

  import AuthStatus from "$lib/components/auth/AuthStatus.svelte";
  import ButtonPill from "$lib/components/common/ButtonPill.svelte";
  import Logo from "$lib/components/common/Logo.svelte";
  import Seo from "$lib/components/layout/Seo.svelte";
  import { FORUM_URL } from "$lib/constants";

  const LINKS = [
    ["About", "/about"],
    ["FAQ", "/frequently-asked-questions"],
    ["Conduct", "/code-of-conduct"],
    ["Privacy", "/privacy"],
    ["Terms", "/terms-of-service"],
  ];
</script>

<Seo />

<div class="grid min-h-screen grid-flow-row grid-rows-[1fr_auto_1fr] px-4">
  <div class="flex justify-center">
    <div class="flex h-32 w-full max-w-2xl items-center justify-end">
      <AuthStatus />
    </div>
  </div>

  <div class="flex select-none flex-col items-center justify-center">
    <Logo class="h-auto w-full px-8 md:h-28 md:w-auto md:px-0" />

    <span class="mt-2 font-semibold text-stone-500"> An unofficial website for EPFL.</span>

    <div class="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-2 text-stone-400">
      {#each LINKS as [text, href]}
        <a class="font-semibold hover:text-stone-600" {href}>{text}</a>
        <span class="last:hidden">&bull;</span>
      {/each}
    </div>

    <div class="mt-12">
      <ButtonPill
        class="inline-flex items-center bg-orange-600 font-bold text-white hover:bg-orange-500"
        href={FORUM_URL}
      >
        <Icon src={Annotation} class="mr-2 h-5 w-5" theme="solid" />
        Forum
      </ButtonPill>
    </div>
  </div>
</div>
