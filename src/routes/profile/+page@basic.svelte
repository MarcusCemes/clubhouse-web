<script lang="ts">
  import Seo from "$lib/components/layout/Seo.svelte";
  import Profile from "$lib/components/profile/Profile.svelte";
  import { getSession } from "$lib/stores/auth";

  const session = getSession();
</script>

<Seo title="Profile" />

<div class="flex flex-col items-center">
  <div class="my-8 w-full max-w-md">
    <h1 class="mb-8 text-4xl font-bold">My Profile</h1>
    <Profile state={$session} />
  </div>
</div>
