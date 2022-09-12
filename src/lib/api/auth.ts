import { z } from "zod";

import type { AuthState } from "$lib/stores/auth";

import { ApiCodeError, userSchema, type User } from "./core";
import { apiGet, apiPost, type Fetch } from "./http";

const codeDto = z.object({ code: z.string() });
const redirectDto = z.object({ redirect: z.string() });
const userDto = z.object({ user: userSchema });
const tokenDto = z.object({ token: z.string() });
const availableDto = z.object({ available: z.boolean() });

/**
 * Requests a new sign-in procedure from the token, returning
 * the URL that the user should be be redirected to authenticate
 * themselves.
 */
export async function apiSignInStart(
  then = "/",
  fetch?: Fetch
): Promise<{ code: "SIGN_IN"; redirect: string }> {
  const url = "/auth/start";

  const { data } = await apiPost(url, { then }, fetch);
  const { code } = codeDto.parse(data);

  switch (code) {
    case "SIGN_IN":
      return { code, redirect: redirectDto.parse(data).redirect };

    default:
      throw new ApiCodeError(code);
  }
}

/**
 * Requests a new sign-in procedure from the token, returning
 * the URL that the user should be be redirected to authenticate
 * themselves.
 */
export async function apiSignInComplete(
  key: string,
  auth_check: string,
  fetch?: Fetch
): Promise<
  | { code: "SIGNED_IN"; user: User }
  | { code: "CONFIRM_ACCOUNT"; token: string }
  | { code: "E_BAD_KEY" }
> {
  const url = "/auth/complete";

  const { data } = await apiPost(url, { key, auth_check }, fetch);
  const { code } = codeDto.parse(data);

  switch (code) {
    case "SIGNED_IN":
      return { code, user: userDto.parse(data).user };

    case "CONFIRM_ACCOUNT":
      return { code, token: tokenDto.parse(data).token };

    case "E_BAD_KEY":
      return { code: "E_BAD_KEY" };

    default:
      throw new ApiCodeError(code);
  }
}

/** Action that confirms the user's account given a valid server-signed token. */
export async function apiConfirmAccount(token: string, fetch?: Fetch): Promise<AuthState> {
  const url = "/auth/confirm-account";

  const { data } = await apiPost(url, { token }, fetch);
  const { code } = codeDto.parse(data);

  switch (code) {
    case "SIGNED_IN":
      return { state: code, data: userDto.parse(data).user };

    case "E_BAD_TOKEN":
    case "E_TOKEN_EXPIRED":
      return { state: "ERROR", data: code };

    default:
      throw new ApiCodeError(code);
  }
}

/**
 * Fetch the authentication status of the user from the API.
 *
 * The session token is stored in a HTTP-only secure cookie,
 * and may expire or be revoked independently of the local
 * expiry time.
 */
export async function apiCurrentUser(fetch = window.fetch): Promise<AuthState> {
  const url = "/auth/current-user";

  const { data } = await apiGet(url, fetch);
  const { code } = codeDto.parse(data);

  switch (code) {
    case "SIGNED_IN":
      return { state: code, data: userDto.parse(data).user };

    case "SIGNED_OUT":
      return { state: code, data: undefined };

    default:
      throw new ApiCodeError(code);
  }
}

/**
 * Check the availability of a username, returning true if
 * the API reports that the username is available.
 *
 * This call is restricted to users that are
 * currently in the CONFIRMING_ACCOUNT authentication state.
 */
export async function apiUsernameAvailable(username: string, fetch?: Fetch): Promise<boolean> {
  const url = `/auth/username-availability/${username}`;

  const { data } = await apiGet(url, fetch);
  const { available } = availableDto.parse(data);
  return available;
}

export async function apiChooseUsername(
  username: string,
  fetch?: Fetch
): Promise<{ code: "USERNAME_CHANGED" | "E_USERNAME_CHOSEN" | "E_USERNAME_TAKEN" }> {
  const url = "/auth/choose-username";

  const { data } = await apiPost(url, { username }, fetch);
  const { code } = codeDto.parse(data);

  switch (code) {
    case "USERNAME_CHANGED":
    case "E_USERNAME_CHOSEN":
    case "E_USERNAME_TAKEN":
      return { code };

    default:
      throw new ApiCodeError(code);
  }
}

export async function apiDiscourseConnect(
  sso: string,
  sig: string,
  fetch = window.fetch
): Promise<{ code: "CONNECT"; redirect: string } | { code: "E_UNAUTHENTICATED" }> {
  const url = "/auth/discourse/connect";

  const { data } = await apiPost(url, { sso, sig }, fetch);
  const { code } = codeDto.parse(data);

  switch (code) {
    case "CONNECT":
      return { code, ...redirectDto.parse(data) };

    case "E_UNAUTHENTICATED":
      return { code };

    default:
      throw new ApiCodeError(code);
  }
}

/**
 * Requests that the user be signed-out, expiring the
 * server-side session token and browser-stored cookies.
 */
export async function apiSignOut(fetch?: Fetch) {
  const url = "/auth/sign-out";
  await apiPost(url, undefined, fetch);
}
