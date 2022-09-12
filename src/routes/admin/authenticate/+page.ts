import { error } from "@sveltejs/kit";

import type { PageLoadEvent } from "./$types";

export const prerender = false;

export async function load(event: PageLoadEvent) {
  const params = event.url.searchParams;

  const token = params.get("token");

  if (!token) throw error(400, "Missing token");

  return { token };
}
