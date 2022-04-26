import { API_URL } from "$lib/api/constants";
import type { AuthState } from "$lib/stores/auth";
import type { GetSession } from "@sveltejs/kit";

/**
 * Similar implementation to apiCurrentUser(), but makes
 * a direct `fetch` request to the API with manual credentials.
 */
export const getSession: GetSession = async (event) => {
    console.log(`${new Date().toISOString()} Fetching session...`);
    const cookie = event.request.headers.get("Cookie");

    const user = await currentUser(cookie);
    return { user };
};

async function currentUser(cookie: string | null): Promise<AuthState> {
    const response = await fetch(`${API_URL}/auth/current-user`, {
        credentials: "include",
        headers: cookie ? { cookie } : undefined,
    });

    const { code, user } = await response.json();

    switch (code) {
        case "SIGNED_IN":
            return { state: "SIGNED_IN", data: user };
        case "SIGNED_OUT":
            return { state: "SIGNED_OUT" };
        case "CONFIRM_ACCOUNT":
            return { state: "CONFIRM_ACCOUNT" };

        default:
            console.error("Could not get the current user");
            return { state: "ERROR" };
    }
}
