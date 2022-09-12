import { browser } from "$app/env";
import { writable, type Readable } from "svelte/store";

import { apiCurrentUser } from "$lib/api/auth";
import type { User } from "$lib/api/core";
import type { State } from "$lib/utils";

/** The possible authentication state of the user. */
export type AuthState =
  | State<"SIGNED_IN", User>
  | State<"CONFIRM_ACCOUNT", { token: string; then: string }>
  | State<"SIGNED_OUT">
  | State<"CHECKING">
  | State<"ERROR", string | undefined>;

/** Ensures that the auth status is only fetched when the application is loaded. */
let stale = true;

/** The application session store. */
const sessionStore = writable<AuthState>({ state: "CHECKING", data: undefined });

export function getSession(): Readable<AuthState> {
  if (browser && stale) {
    stale = false;
    apiCurrentUser()
      .then(sessionStore.set)
      .catch((error) => sessionStore.set({ state: "ERROR", data: String(error) }));
  }

  return sessionStore;
}

/**
 * A convenience function to update the session store.
 *
 * The session store is **contextual**, this function
 * must be given the correct instance that can only be
 * retrieved by synchronously calling `getStores()`
 * during component initialization!
 *
 * Passing the global `$session` store will not work.
 *
 * ## Examples
 *     <script lang="ts">
 *     const { session } = getStores();
 *
 *     onMount(async () => {
 *       await sleep(1000);
 *       updateSessionStore(session, { state: "SIGNED_OUT" });
 *     });
 *     </script>
 */
export function setSession(state: AuthState): void {
  stale = false;
  sessionStore.set(state);
}

export function updateSession(fn: (state: AuthState) => AuthState): void {
  stale = false;
  sessionStore.update(fn);
}
