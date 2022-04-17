import { onMount } from "svelte";

/**
 * A hook that runs a callback a certain duration after
 * the component mounts.
 */
export function useTimeout(fn: () => void, timeMs: number) {
    onMount(() => {
        const timeout = setTimeout(fn, timeMs);
        return () => clearTimeout(timeout);
    });
}
