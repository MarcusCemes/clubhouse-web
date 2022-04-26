import { goto } from "$app/navigation";
import { session } from "$app/stores";
import { apiSignIn, apiSignOut } from "$lib/api/auth";
import { updateSessionStore } from "$lib/stores/auth";

/**
 * Requests a new sign-in flow from the API, updates
 * the session store and redirects the user programmatically.
 */
export async function actionSignIn() {
    try {
        const { state, data } = await apiSignIn();

        if (state === "CONFIRM_ACCOUNT") updateSessionStore({ state });

        await goto(data);
    } catch (error) {
        console.error("Could not sign-in", error);
        updateSessionStore({ state: "ERROR" });
    }
}

/**
 * Requests to be signed-out from the API, updating the
 * session store with the new authentication state.
 */
export async function actionSignOut() {
    try {
        await apiSignOut();
        session.update((x) => ({ ...x, user: { state: "SIGNED_OUT" } }));
    } catch (error) {
        console.error("Could not sign-out", { error });
        session.update((x) => ({ ...x, user: { state: "ERROR" } }));
    }
}
