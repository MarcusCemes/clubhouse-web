<script lang="ts">
  import { classes } from "$lib/utils";

  let className: string | undefined = undefined;
  export { className as class };
</script>

<span class={classes("flex items-center gap-x-1.5", className)}>
  <span class="_dot h-2 w-2 rounded-full bg-current transition duration-100" />
  <span class="_dot h-2 w-2 rounded-full bg-current transition duration-100" />
  <span class="_dot h-2 w-2 rounded-full bg-current transition duration-100" />
</span>

<style>
  ._dot {
    animation: dotAnimation 1.8s infinite cubic-bezier(0.65, 0, 0.35, 1);
    animation-fill-mode: both;
  }

  ._dot:nth-of-type(2) {
    animation-delay: 0.16s;
  }

  ._dot:nth-of-type(3) {
    animation-delay: 0.32s;
  }

  @keyframes dotAnimation {
    0%,
    100% {
      transform: scale(0%);
    }
    50% {
      transform: scale(100%);
    }
  }
</style>
