<script lang="ts">
  import { goto } from "$app/navigation";
  import { getStores } from "$app/stores";
  import toast from "svelte-french-toast";

  import { apiSignInStart, apiSignOut } from "$lib/api/auth";
  import { getSession, setSession } from "$lib/stores/auth";

  import AuthMenu from "./AuthMenu.svelte";
  import AuthStatusButtonText from "./AuthStatusButtonText.svelte";

  const { page } = getStores();
  const session = getSession();

  $: state = $session;
  $: url = $page.url;

  async function signIn() {
    const { redirect } = await apiSignInStart(url.href);
    window.location.href = redirect;
  }

  async function onSignOut() {
    await apiSignOut();
    setSession({ state: "SIGNED_OUT" });
    toast.success("You have been signed out");
  }

  function onClick() {
    switch (state.state) {
      case "SIGNED_OUT":
        signIn();
        break;

      case "CONFIRM_ACCOUNT":
        goto("/welcome");
        break;
    }
  }
</script>

<AuthMenu on:click={onClick} on:sign-out={onSignOut} enableMenu={state.state === "SIGNED_IN"}>
  <AuthStatusButtonText />
</AuthMenu>
