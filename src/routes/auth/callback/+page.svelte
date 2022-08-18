<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  import { apiSignInComplete } from "$lib/api/auth";
  import { setSession } from "$lib/stores/auth";

  import type { PageData } from "./$types";

  export let data: PageData;

  onMount(async () => {
    const result = await apiSignInComplete(data.key, data.authCheck);

    switch (result.code) {
      case "SIGNED_IN":
        setSession({ state: result.code, data: result.user });
        goto(data.then);
        break;

      case "CONFIRM_ACCOUNT":
        setSession({ state: result.code, data: { token: result.token, then: data.then } });
        goto("/welcome");
        break;
    }
  });
</script>
