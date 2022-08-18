<script lang="ts">
  let className = "";
  export { className as class };
</script>

<div class={`flex flex-col justify-center items-center ${className}`}>
  <slot />
</div>
