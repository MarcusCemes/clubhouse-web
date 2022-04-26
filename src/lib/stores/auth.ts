import { session } from "$app/stores";
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

// export const authStore = writable<AuthState>({ state: "CHECKING" });

export function updateSessionStore(user: AuthState) {
    session.update((session) => ({ ...session, user }));
}
