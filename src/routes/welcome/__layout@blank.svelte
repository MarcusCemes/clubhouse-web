<script lang="ts">
    import { goto } from "$app/navigation";
    import Seo from "$lib/components/layout/Seo.svelte";
    import { authStore } from "$lib/stores/auth";

    $: auth = $authStore;
    $: (auth.state === "SIGNED_IN" || auth.state === "SIGNED_OUT") && goto("/");
</script>

<Seo title="Welcome to Clubhouse!" noSuffix />

<div
    class="min-h-screen p-2 flex flex-col justify-center items-center bg-gradient-to-tr from-[#FFC371] to-[#FF5F6D]"
>
    <slot />
</div>
