<script lang="ts">
  import { goto } from "$app/navigation";
  import { getStores } from "$app/stores";

  import { chooseUsernameThen } from "$lib/../routes/choose-username/+page";
  import { apiDiscourseConnect, apiSignInStart } from "$lib/api/auth";
  import ScreenLoader from "$lib/components/common/ScreenLoader.svelte";
  import { getSession, type AuthState } from "$lib/stores/auth";

  const { page } = getStores();
  const session = getSession();

  $: url = $page.url;
  $: state = $session;

  $: authChange(url, state);

  async function authChange(url: URL, state: AuthState) {
    switch (state.state) {
      case "SIGNED_OUT":
        await redirectToSignIn(url);
        break;

      case "SIGNED_IN":
        if (state.data.username) await connect(url);
        else await chooseUsername(url);
        break;
    }
  }

  async function chooseUsername(url: URL) {
    chooseUsernameThen.set(url.href);
    goto("/choose-username", { replaceState: true });
  }

  async function redirectToSignIn(url: URL) {
    const { redirect } = await apiSignInStart(url.href);
    goto(redirect, { replaceState: true });
  }

  async function connect(url: URL) {
    const sso = url.searchParams.get("sso");
    const sig = url.searchParams.get("sig");

    if (!sso || !sig) {
      throw new Error("Expected sso payload and valid signature");
    }

    const result = await apiDiscourseConnect(sso, sig);

    if (result.code === "CONNECT") goto(result.redirect, { replaceState: true });
    else redirectToSignIn(url);
  }
</script>

<ScreenLoader>Signing in</ScreenLoader>
