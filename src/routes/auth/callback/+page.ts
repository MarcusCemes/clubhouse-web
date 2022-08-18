import { error } from "@sveltejs/kit";

import type { PageLoadEvent } from "./$types";

export const prerender = false;

export async function load(event: PageLoadEvent) {
  const params = event.url.searchParams;

  const key = params.get("key");
  const authCheck = params.get("auth_check");
  const then = params.get("then") ?? "/";

  if (!key) throw error(400, "Missing key");
  if (!authCheck) throw error(400, "Missing auth_check");

  return { key, authCheck, then };
}
