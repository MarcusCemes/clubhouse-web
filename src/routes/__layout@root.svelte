<script lang="ts">
    import Footer from "$lib/components/layout/footer/Footer.svelte";
    import Nav from "$lib/components/layout/nav/Nav.svelte";
</script>

<div class="flex min-h-screen flex-col bg-stone-50 px-4">
    <Nav />
    <main>
        <slot />
    </main>
    <div class="flex-1" />
    <Footer />
</div>
