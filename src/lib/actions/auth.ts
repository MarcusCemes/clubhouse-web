import { goto } from "$app/navigation";
import { apiSignIn, apiSignOut } from "$lib/api/auth";
import { authStore } from "$lib/stores/auth";

/**
 * Requests a new sign-in flow from the API, updates
 * the authStore and redirects the user programmatically.
 */
export async function actionSignIn() {
    try {
        const { state, data } = await apiSignIn();

        if (state === "CONFIRM_ACCOUNT")
            authStore.set({ state: "CONFIRM_ACCOUNT" });

        await goto(data);
    } catch (err) {
        console.error("Error signing in", err);
        authStore.set({ state: "ERROR" });
    }
}

/**
 * Requests to be signed-out from the API, updating the
 * authStore with the new authentication state.
 */
export async function actionSignOut() {
    try {
        await apiSignOut();
        authStore.set({ state: "SIGNED_OUT" });
    } catch (err) {
        console.error("Error signing out", err);
        authStore.set({ state: "ERROR" });
    }
}
