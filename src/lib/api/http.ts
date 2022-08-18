import { API_URL } from "$lib/constants";

/** A simplified interface for `fetch()`, compatible with SvelteKit's implementation. */
export type Fetch = (info: RequestInfo, init?: RequestInit) => Promise<Response>;

interface ApiResponse {
  data: unknown;
  status: number;
}

/** Execute a GET API request. */
export async function apiGet(path: string, fetch?: Fetch): Promise<ApiResponse> {
  return await call(
    path,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    },
    fetch
  );
}

/** Execute a POST API request. */
export async function apiPost(
  path: string,
  payload?: Record<string, unknown>,
  fetch?: Fetch
): Promise<ApiResponse> {
  return await call(
    path,
    {
      method: "POST",
      credentials: "include",
      body: payload && JSON.stringify(payload),
      headers: {
        Accept: "application/json",
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
 * will automatically handle the authentication headers.
 *
 * @see https://kit.svelte.dev/docs/loading
 */
export async function call(
  path: string,
  options: RequestInit = {},
  fetch: Fetch = window.fetch
): Promise<ApiResponse> {
  const response = await fetch(API_URL + path, options);
  const data = await response.json();
  return { data, status: response.status };
}
