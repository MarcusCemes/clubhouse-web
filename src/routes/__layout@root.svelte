<script lang="ts" context="module">
    import type { Load } from "./__layout@root";

    export const load: Load = async ({ fetch }) => ({
        props: { user: await apiCurrentUser(fetch) },
    });
</script>

<script lang="ts">
    import Footer from "$lib/components/layout/footer/Footer.svelte";
    import Nav from "$lib/components/layout/nav/Nav.svelte";
    import { apiCurrentUser } from "$lib/api/auth";
    import { authStore, type AuthState } from "$lib/stores/auth";

    export let user: AuthState;

    // Update the application stores with the session
    authStore.set(user);
</script>

<div class="min-h-screen flex flex-col">
    <Nav />
    <main>
        <slot />
    </main>
    <div class="flex-1" />
    <Footer />
</div>
