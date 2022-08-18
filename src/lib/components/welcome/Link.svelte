<script lang="ts">
  import { ExternalLink } from "@steeze-ui/heroicons";
  import { Icon } from "@steeze-ui/svelte-icon";

  export let href: string;
</script>

<a class="text-sky-500 transition-colors duration-100 hover:text-sky-600" {href} target="_blank">
  <slot />
  <Icon class="inline h-[1em] w-[1em]" src={ExternalLink} />
</a>
