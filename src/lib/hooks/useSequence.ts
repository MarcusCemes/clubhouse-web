import { onMount } from "svelte";
import { writable, type Readable } from "svelte/store";

import { sleep } from "$lib/utils";

export type Step = { tag: number | string; abs?: number; rel?: number };
export type Sequence = readonly Step[];

/** Extracts a union of all tags in the Sequence. */
type Tags<T extends Sequence> = T[number]["tag"];

/**
 * A hook that returns a readable store that changes to a delayed sequence of tags
 * to facilitate the creation of a sequence of asynchronous actions, such as animations.
 *
 * This hook uses `onMount()` to register timeouts, and unregisters them when the component
 * unmounts. To get better type inference, pass the parameter using `as const` or use an
 * enum type.
 */
export function useSequence<T extends Sequence>(
  sequence: T,
  initial: Tags<T> = sequence[0].tag
): Readable<Tags<T>> {
  const store = writable<Tags<T>>(initial);

  onMount(() => {
    let timeAccumulator = 0;

    let timeoutRef: NodeJS.Timeout | undefined;
    let stopped = false;

    (async () => {
      for (const item of sequence) {
        const delay = item.abs ? item.abs - timeAccumulator : item.rel ? item.rel : 0;
        timeAccumulator += delay;

        if (delay > 0) await sleep(delay);
        if (stopped) return;

        store.set(item.tag);
      }
    })();

    return () => {
      clearTimeout(timeoutRef);
      stopped = true;
    };
  });

  return store;
}
