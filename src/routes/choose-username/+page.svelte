<script lang="ts">
  import { goto } from "$app/navigation";
  import toast from "svelte-french-toast";

  import { apiChooseUsername } from "$lib/api/auth";
  import ScreenLoader from "$lib/components/common/ScreenLoader.svelte";
  import ChooseUsername from "$lib/components/username/ChooseUsername.svelte";
  import Background from "$lib/components/welcome/Background.svelte";
  import { useBusy } from "$lib/hooks/useBusy";
  import { getSession, updateSession } from "$lib/stores/auth";

  import { chooseUsernameThen } from "./+page";

  const [busy, withBusy] = useBusy();

  const session = getSession();

  $: if (!["CHECKING", "SIGNED_IN"].includes($session.state)) {
    goto("/", { replaceState: true });
  }

  function updateUsername(username: string) {
    updateSession((state) =>
      state.state === "SIGNED_IN" ? { ...state, data: { ...state.data, username } } : state
    );
  }

  function onAccept({ detail: username }: CustomEvent<string>) {
    withBusy(async () => {
      try {
        const result = await apiChooseUsername(username);

        const then = chooseUsernameThen.take() ?? "/";

        switch (result.code) {
          case "USERNAME_CHANGED":
            updateUsername(username);
            goto(then, { replaceState: true });
            break;

          case "E_USERNAME_CHOSEN":
            toast.error("You already have a username!");
            goto(then, { replaceState: true });
            break;

          default:
            throw new Error("Code " + result.code);
        }
      } catch (error) {
        console.error("Could not change username:", error);
        toast.error("Something went wrong");
      }
    });
  }

  function onReject() {
    goto("/", { replaceState: true });
  }
</script>

{#if $session.state === "SIGNED_IN"}
  <Background />
  <ChooseUsername disabled={$busy} on:accept={onAccept} on:reject={onReject} />
{:else}
  <ScreenLoader />
{/if}
