<script lang="ts" context="module">
    import { apiCurrentUser } from "$lib/api/auth";
    import Seo from "$lib/components/layout/Seo.svelte";
    import { authStore, type AuthState } from "$lib/stores/auth";
    import type { Load } from "./__layout@root";

    export const load: Load = async ({ fetch }) => {
        const user = await apiCurrentUser(fetch);

        return user.state === "CONFIRM_ACCOUNT"
            ? {
                  props: { user },
              }
            : {
                  redirect: "/",
                  status: 302,
              };
    };
</script>

<script lang="ts">
    export let user: AuthState;
    authStore.set(user);
</script>

<Seo title="Welcome to Clubhouse!" noSuffix />

<div
    class="min-h-screen p-2 flex flex-col justify-center items-center bg-gradient-to-tr from-[#FFC371] to-[#FF5F6D]"
>
    <slot />
</div>
