import type { AuthState } from "$lib/stores/auth";
import type { State } from "$lib/utils";
import { apiGet, apiPost } from "./http";

export interface User {
    email: string;
    username: string;
    first_name?: string;
    last_name?: string;
}

/**
 * Starts a new sign-in flow.
 * @returns The returned API code and a URl to redirect to
 */
export async function apiSignIn(
    fetch?: typeof window.fetch
): Promise<State<"SIGN_IN" | "CONFIRM_ACCOUNT", string>> {
    const { data } = await apiPost<{ code: string; url?: string }>(
        "/auth/sign-in",
        undefined,
        fetch
    );

    switch (data.code) {
        case "SIGN_IN":
        case "CONFIRM_ACCOUNT":
            return { state: data.code, data: data.url ?? "/welcome" };

        default:
            throw new Error(`Unexpected code: ${data.code}`);
    }
}

/**
 * Confirms the user's account with the API.
 * @param accepted_tos Whether the user accepted the Terms of Service
 * @param username The chosen username of the user
 * @returns Whether the user is now signed in
 */
export async function apiConfirmAccount(
    accepted_tos: boolean,
    username: string,
    fetch?: typeof window.fetch
): Promise<boolean> {
    const url = "/auth/sign-in/confirm-account";
    const body = { accepted_tos, username };
    const { data } = await apiPost(url, body, fetch);
    return data.code === "SIGNED_IN";
}

/**
 * Request the user's account information from the API, or
 * their authentication state if they are not signed in.
 * This information is private to the server, identified by
 * a HTTP-only session cookie.
 * @returns The authentication status of the user
 */
export async function apiCurrentUser(fetch = window.fetch): Promise<AuthState> {
    const url = "/auth/current-user";

    try {
        const { data } = await apiGet<{ code: string; user: User }>(url, fetch);

        switch (data.code) {
            case "SIGNED_IN":
                return { state: "SIGNED_IN", data: data.user };
            case "SIGNED_OUT":
                return { state: "SIGNED_OUT" };
            case "CONFIRM_ACCOUNT":
                return { state: "CONFIRM_ACCOUNT" };
        }

        console.error(`Unrecognised code: ${data.code}`);
    } catch (error) {
        /* */
    }

    return { state: "ERROR" };
}

/**
 * Check the availability of a username.
 * This API call is only available to users that are
 * currently in the CONFIRMING_ACCOUNT authentication state.
 *
 * @throws {Error} If the user is not confirming their account.
 * @returns Whether the username is available.
 */
export async function apiCheckUsername(
    username: string,
    fetch?: typeof window.fetch
): Promise<boolean> {
    type R = { available: boolean } | { code: string };
    const url = `/auth/check-username/${username}`;
    const { data } = await apiGet<R>(url, fetch);

    if ("code" in data) throw new Error(`Unexpected code: ${data.code}`);
    return data.available;
}

/**
 * Requests that the user be signed-out, expiring the
 * server-side session token and browser-stored cookies.
 */
export async function apiSignOut(fetch?: typeof window.fetch) {
    const url = "/auth/sign-out";
    await apiPost(url, undefined, fetch);
}
