import type { JSONObject } from "@sveltejs/kit/types/private";
import { API_URL } from "./constants";

interface ApiResponse<T = JSONObject> {
    data: T;
    status: number;
}

export async function apiGet<T = JSONObject>(
    path: string
): Promise<ApiResponse<T>> {
    return await makeApiRequest<T>(path, {
        method: "GET",
        credentials: "include",
    });
}

export async function apiPost<T = JSONObject>(
    path: string,
    payload?: Record<string, unknown>
): Promise<ApiResponse<T>> {
    return await makeApiRequest<T>(path, {
        method: "POST",
        credentials: "include",
        body: payload && JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export async function makeApiRequest<T = JSONObject>(
    path: string,
    options: RequestInit = {}
): Promise<ApiResponse<T>> {
    const response = await fetch(API_URL + path, options);
    const data = await response.json();
    return { data, status: response.status };
}
