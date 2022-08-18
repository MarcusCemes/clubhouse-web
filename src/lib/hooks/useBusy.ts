import { writable, type Readable } from "svelte/store";

/**
 * Returns a boolean readable store and a function. Executing the function
 * with another promise-returning function as a parameter will set the store
 * to `true` for the duration until the promise returned by the parameter
 * function resolves or rejects.
 *
 * ## Examples
 *
 * const [busy, withBusy] = useBusy();
 *
 * onMount(() => {
 *   withBusy(async () => {
 *     await sleep(2000);
 *   });
 * });
 *
 * $: console.log("Sleeping: " + $busy);
 */
export function useBusy(): [Readable<boolean>, <T>(fn: () => Promise<T>) => Promise<T>] {
  const busy = writable(false);

  return [
    busy,
    async (fn) => {
      busy.set(true);
      try {
        return await fn();
      } finally {
        busy.set(false);
      }
    },
  ];
}
