import type { User } from "$lib/api/auth";
import type { State } from "$lib/utils";
import { writable } from "svelte/store";

export type AuthState =
    | State<"SIGNED_IN", User>
    | State<"CONFIRM_ACCOUNT">
    | State<"SIGNED_OUT">
    | State<"CHECKING">
    | State<"ERROR">;

export const authStore = writable<AuthState>({ state: "CHECKING" });
