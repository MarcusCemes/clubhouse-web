<script lang="ts">
  import src from "$lib/assets/logo/clubhouse.svg";

  let className: string | undefined = undefined;
  export { className as class };
</script>

<img {src} class={`pointer-events-none select-none ${className}`} alt="Clubhouse logo" />
