<script lang="ts">
  import { Check, ChevronRight, X } from "@steeze-ui/heroicons";
  import { Icon } from "@steeze-ui/svelte-icon";

  import Loader from "$lib/components/common/Loader.svelte";
  import type { AuthState } from "$lib/stores/auth";

  import Centre from "../common/Centre.svelte";
  import Row from "./Row.svelte";

  export let state: AuthState;
</script>

{#if state.state === "CHECKING"}
  <Centre class="h-48 font-medium text-gray-400">
    <Loader />
  </Centre>
{:else if state.state === "SIGNED_IN"}
  {@const user = state.data}

  <table class="w-full border-separate border-spacing-x-0 border-spacing-y-1">
    <tbody>
      <Row title="Unique ID" class="font-mono tracking-wide" tooltip="Your internal unique ID">
        {user.uid}
      </Row>
      <Row title="Email">{user.email}</Row>
      <Row title="First name">{user.first_name}</Row>
      <Row title="Last name">{user.last_name}</Row>
      <Row title="Username" tooltip="People can use this to mention you">
        {#if user.username}
          {user.username}
        {:else}
          <span class="italic text-gray-500">Not set</span>
        {/if}
      </Row>
      <Row title="Unit" tooltip="Your current academic unit, as reported by EPFL">
        {#if user.unit}
          <div class="flex items-center">
            {#each user.unit.split("/") as level}
              <span class="whitespace-nowrap">{level}</span>
              <Icon class="mx-2 h-3 w-3 text-gray-400 last:hidden" src={ChevronRight} />
            {/each}
          </div>
        {:else}
          <span class="italic text-gray-500">Unknown</span>
        {/if}
      </Row>
      <Row title="Student" tooltip="Whether you belong to the ETU unit">
        {#if user.unit}
          {@const isStudent = user.unit.includes("ETU")}
          <Icon
            src={isStudent ? Check : X}
            class={`w-5 h-5 ${isStudent ? "text-green-500" : "text-red-500"}`}
          />
        {:else}
          <span class="italic text-gray-500">Unknown</span>
        {/if}
      </Row>
    </tbody>
  </table>
{:else if state.state === "SIGNED_OUT"}
  <Centre class="h-48 select-none font-medium text-gray-400">You are not signed in</Centre>
{:else if state.state === "ERROR"}
  <Centre class="h-48 select-none font-medium text-gray-400">Could not fetch profile</Centre>
{/if}
