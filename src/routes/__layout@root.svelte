<script lang="ts">
    import Footer from "$lib/components/layout/footer/Footer.svelte";
    import Nav from "$lib/components/layout/nav/Nav.svelte";
</script>

<div class="min-h-screen flex flex-col">
    <Nav />
    <main>
        <slot />
    </main>
    <div class="flex-1" />
    <Footer />
</div>
