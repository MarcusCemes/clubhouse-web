import type { AuthState } from "$lib/stores/auth";
import { apiGet, apiPost } from "./http";

export interface User {
    email: string;
    username: string;
    first_name?: string;
    last_name?: string;
}

export async function startSignIn(): Promise<string> {
    const { data } = await apiPost<{ code: string; url: string }>(
        "/auth/sign-in"
    );

    switch (data.code) {
        case "SIGN_IN":
            return data.url;

        case "CONFIRM_ACCOUNT":
            return "/welcome";
    }

    throw new Error(`Unexpected code: ${data.code}`);
}

export async function completeAccountConfirmation(
    accepted_tos: boolean,
    username: string
): Promise<boolean> {
    const url = "/auth/sign-in/confirm-account";
    const body = { accepted_tos, username };
    const { data } = await apiPost(url, body);
    return data.code === "SIGNED_IN";
}

export async function apiAuthStatus(): Promise<AuthState> {
    const url = "/auth/current-user";

    try {
        const { data } = await apiGet<{ code: string; user: User }>(url);

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

export async function apiCheckUsername(
    username: string
): Promise<boolean | null> {
    const url = `/auth/check-username/${username}`;
    const { data } = await apiGet<{ available: boolean } | { code: string }>(
        url
    );

    if ("code" in data) {
        return null;
    }

    return data.available;
}

export async function apiSignOut() {
    const url = "/auth/sign-out";
    await apiPost(url);
}
