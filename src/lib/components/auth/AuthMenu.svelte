<script lang="ts">
  import { Menu, MenuItems } from "@rgossiaux/svelte-headlessui";
  import { Logout, User } from "@steeze-ui/heroicons";
  import { Icon } from "@steeze-ui/svelte-icon";
  import { createEventDispatcher } from "svelte";
  import { cubicInOut } from "svelte/easing";
  import { scale } from "svelte/transition";

  import AuthMenuButton from "./auth_menu/AuthMenuButton.svelte";
  import AuthMenuItem from "./auth_menu/AuthMenuItem.svelte";

  export let enableMenu: boolean;

  const dispatch = createEventDispatcher();

  function onSignOut() {
    dispatch("sign-out");
  }
</script>

<Menu class="relative" let:open>
  <AuthMenuButton on:click>
    <slot />
  </AuthMenuButton>

  {#if enableMenu && open}
    <div transition:scale={{ start: 0.95, easing: cubicInOut, duration: 200 }}>
      <MenuItems
        class="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <AuthMenuItem href="/profile">
          <Icon class="mr-2 h-5 w-5" src={User} />
          My Profile
        </AuthMenuItem>

        <AuthMenuItem on:click={onSignOut} activeColour="bg-red-500 text-white active:bg-red-600">
          <Icon class="mr-2 h-5 w-5" src={Logout} />
          Sign out
        </AuthMenuItem>
      </MenuItems>
    </div>
  {/if}
</Menu>
