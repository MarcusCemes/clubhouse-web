import type { JSONObject } from "@sveltejs/kit/types/private";
import { API_URL } from "./constants";

interface ApiResponse<T = JSONObject> {
    data: T;
    status: number;
}

/** Makes a GET API request using the `makeApiRequest()` function. */
export async function apiGet<T = JSONObject>(
    path: string,
    fetch?: typeof window.fetch
): Promise<ApiResponse<T>> {
    return await makeApiRequest<T>(
        path,
        {
            method: "GET",
            credentials: "include",
        },
        fetch
    );
}

/** Makes a POST API request using the `makeApiRequest()` function. */
export async function apiPost<T = JSONObject>(
    path: string,
    payload?: Record<string, unknown>,
    fetch?: typeof window.fetch
): Promise<ApiResponse<T>> {
    return await makeApiRequest<T>(
        path,
        {
            method: "POST",
            credentials: "include",
            body: payload && JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
            },
        },
        fetch
    );
}

/**
 * Makes a standard API request using the Fetch API, concatenating
 * the path to the API base URL. Assumes that the response payload
 * is JSON, directly returning the parsed payload.
 *
 * A custom fetch function may be passed for the request,
 * this works really well together with SvelteKit as it
 * will forward client data such as cookies.
 *
 * @see https://kit.svelte.dev/docs/loading
 */
export async function makeApiRequest<T = JSONObject>(
    path: string,
    options: RequestInit = {},
    fetch = window.fetch
): Promise<ApiResponse<T>> {
    const response = await fetch(API_URL + path, options);
    const data = await response.json();
    return { data, status: response.status };
}
