import type { session } from "$app/stores";
import type { User } from "$lib/api/auth";
import type { State } from "$lib/utils";

/**
 * The authentication state is stored in the contextual
 * `$session` store.
 */
export type AuthState =
    | State<"SIGNED_IN", User>
    | State<"CONFIRM_ACCOUNT">
    | State<"SIGNED_OUT">
    // | State<"CHECKING">
    | State<"ERROR">;

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
export function updateSessionStore(
    sessionCtx: typeof session,
    user: AuthState
): void {
    sessionCtx.update((session) => ({ ...session, user }));
}
