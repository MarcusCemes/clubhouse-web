<script lang="ts">
  import { goto } from "$app/navigation";
  import toast from "svelte-french-toast";

  import { apiConfirmAccount } from "$lib/api/auth";
  import Loader from "$lib/components/common/Loader.svelte";
  import Background from "$lib/components/welcome/Background.svelte";
  import Welcome from "$lib/components/welcome/Welcome.svelte";
  import { useBusy } from "$lib/hooks/useBusy";
  import { getSession, setSession } from "$lib/stores/auth";
  import { assert, sleep } from "$lib/utils";

  import { chooseUsernameThen } from "../choose-username/+page";
  import { welcomeAlsoUsername } from "./+page";

  const session = getSession();
  const [busy, withBusy] = useBusy();

  $: state = $session;

  let show = true;
  let ignoreSignIn = false;

  $: if (!ignoreSignIn && !["CHECKING", "CONFIRM_ACCOUNT"].includes(state.state)) {
    toast.error("No pending account confirmation");
    goto("/");
  }

  $: disabled = $busy || state.state !== "CONFIRM_ACCOUNT";

  async function onAccept() {
    const confirmState = state;
    assert(confirmState.state === "CONFIRM_ACCOUNT");

    await withBusy(async () => {
      const response = await confirmAccount(confirmState.data.token);

      switch (response.state) {
        case "SIGNED_IN":
          show = false;
          await sleep(1000);

          ignoreSignIn = true;
          setSession({ state: "SIGNED_IN", data: response.data });

          if (welcomeAlsoUsername.take()) {
            chooseUsernameThen.set(confirmState.data.then);
            goto("/choose-username");
          } else {
            goto(confirmState.data.then);
          }
          break;

        default:
          console.log("Unexpected confirmation code: " + response.state);
          toast.error("Couldn't confirm account at this time");
      }
    });
  }

  async function confirmAccount(token: string) {
    return toast.promise(apiConfirmAccount(token), {
      loading: "Confirming account...",
      success: "Welcome to Clubhouse!",
      error: "Couldn't confirm account at this time",
    });
  }

  async function onReject() {
    ignoreSignIn = true;
    setSession({ state: "SIGNED_OUT" });
    toast.success("You have been forgotten");
    goto("/");
  }
</script>

{#if state.state === "CONFIRM_ACCOUNT"}
  <Background />
  <Welcome {show} {disabled} on:accept={onAccept} on:reject={onReject} />
{:else}
  <div class="flex min-h-screen flex-col items-center justify-center">
    <Loader />
  </div>
{/if}