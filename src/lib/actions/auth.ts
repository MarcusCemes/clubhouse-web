import { goto } from "$app/navigation";
import type { session } from "$app/stores";
import { apiSignIn, apiSignOut } from "$lib/api/auth";
import { updateSessionStore } from "$lib/stores/auth";

/**
 * Requests a new sign-in flow from the API, updates
 * the session store and redirects the user programmatically.
 */
export async function actionSignIn(sessionCtx: typeof session) {
    try {
        const { state, data } = await apiSignIn();

        if (state === "CONFIRM_ACCOUNT")
            updateSessionStore(sessionCtx, { state });

        await goto(data);
    } catch (error) {
        console.error("Could not sign-in", error);
        updateSessionStore(sessionCtx, { state: "ERROR" });
    }
}

/**
 * Requests to be signed-out from the API, updating the
 * session store with the new authentication state.
 */
export async function actionSignOut(sessionCtx: typeof session) {
    try {
        await apiSignOut();
        updateSessionStore(sessionCtx, { state: "SIGNED_OUT" });
    } catch (error) {
        console.error("Could not sign-out", { error });
        updateSessionStore(sessionCtx, { state: "ERROR" });
    }
}
