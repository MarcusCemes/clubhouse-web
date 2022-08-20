<script lang="ts">
  import { Login, Menu, ShieldExclamation, StatusOffline } from "@steeze-ui/heroicons";
  import { Icon } from "@steeze-ui/svelte-icon";

  import { getSession } from "$lib/stores/auth";

  import Loader from "../common/Loader.svelte";

  const session = getSession();
  $: state = $session;
</script>

{#if state.state === "CHECKING"}
  <Loader class="text-gray-500" />
{:else if state.state === "SIGNED_OUT"}
  <Icon class="mr-2 h-5 w-5" src={Login} />
  Sign in
{:else if state.state === "SIGNED_IN"}
  <Icon class="mr-2 h-5 w-5" src={Menu} />
  <span class="overflow-hidden text-ellipsis whitespace-nowrap">
    {state.data.first_name}
    {state.data.last_name}
  </span>
{:else if state.state === "ERROR"}
  <Icon class="mr-2 h-5 w-5 text-gray-500" src={StatusOffline} />
  <span class="text-gray-500">Unavailable</span>
{:else if state.state === "CONFIRM_ACCOUNT"}
  <Icon src={ShieldExclamation} class="mr-2 h-5 w-5" />
  Confirm account
{/if}
