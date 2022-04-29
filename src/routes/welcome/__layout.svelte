<script lang="ts" context="module">
    import Seo from "$lib/components/layout/Seo.svelte";
    import type { Load } from "./__layout";

    export const load: Load = async ({ session }) =>
        session.user.state !== "CONFIRM_ACCOUNT"
            ? { redirect: "/", status: 302 }
            : {};
</script>

<script lang="ts">
</script>

<Seo title="Welcome to Clubhouse!" noSuffix />

<div
    class="flex min-h-screen flex-col items-center justify-center bg-gradient-to-tr from-[#FFC371] to-[#FF5F6D] p-2"
>
    <slot />
</div>
