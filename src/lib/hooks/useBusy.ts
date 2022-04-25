import { writable, type Readable } from "svelte/store";

export function useBusy(): [
    Readable<boolean>,
    <T>(fn: () => Promise<T>) => Promise<T>
] {
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
