<script lang="ts">
  import Footer from "$lib/components/layout/Footer.svelte";
  import Nav from "$lib/components/layout/Nav.svelte";
</script>

<div class="flex min-h-screen flex-col px-4">
  <Nav />
  <main>
    <slot />
  </main>
  <div class="flex-1" />
  <Footer />
</div>
