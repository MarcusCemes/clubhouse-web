<script lang="ts">
    import { browser } from "$app/env";
    import { startSignIn } from "$lib/api/auth";
    import Title from "$lib/components/common/Title.svelte";
    import Column from "$lib/components/layout/Column.svelte";
    import Seo from "$lib/components/layout/Seo.svelte";
    import { onMount } from "svelte";

    onMount(async () => {
        if (browser) {
            const url = await startSignIn();
            window.location.href = url;
        }
    });
</script>

<Seo title="Sign in" />

<Column marginTop>
    <Title>Sign-in</Title>
</Column>
