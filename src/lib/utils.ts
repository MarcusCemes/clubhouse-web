/** A particular state that something can be in, useful for type unions. */
export type State<T extends string, U = undefined> = U extends undefined
    ? { state: T }
    : { state: T; data: U };

export async function sleep(duration_ms: number): Promise<void> {
    await new Promise((res) => setTimeout(res, duration_ms));
}

/** Any value that is accepted by the `classes()` function. */
export type ClassValue =
    | string
    | null
    | undefined
    | false
    | { [index: string]: boolean };

/** A custom implementation of the `classnames`/`clsx` library. */
export function classes(...classes: ClassValue[]): string {
    return classes
        .flatMap((x) =>
            isObject(x)
                ? Object.entries(x).map(([key, value]) =>
                      value ? key : undefined
                  )
                : x
        )
        .filter((x): x is string => !!x)
        .join(" ");
}

function isObject(x: unknown): x is Record<string, unknown> {
    return typeof x === "object" && x !== null;
}

export function isArray<T>(x: unknown): x is Array<T> {
    return x instanceof Array;
}

export function isTruthy<T>(value: T | null | false | undefined): value is T {
    return !!value;
}

/** Equivalent to `condition ? then : undefined`, removes some unnecessary noise. */
export function ifThen<T>(condition: boolean, then: T): T | undefined {
    return condition ? then : undefined;
}

/** Explicit milliseconds -> seconds conversion. */
export function msToS(ms: number): number {
    return ms / 1000;
}

/** Explicit seconds -> milliseconds conversion. */
export function sToMs(s: number): number {
    return s * 1000;
}

/**
 * Wraps a function with a debounce feature to limit how fast the
 * function can be called. It provides a single immediate invocation
 * to allow for rapid feedback, such as pasting into a field.
 *
 * If the function has not been called for the given delay, the
 * function will be called immediately with the given parameters
 * and a timer will be started for the given delay.
 *
 * If the function is called again before the delay has elapsed,
 * the function will be queued until the delay has expired.
 * Additionally, the timer will be reset for the given delay
 * each time the function is called.
 *
 * Once the timer has fully elapsed without calling the function,
 * the function will be called with the last given set of parameters
 * and the timer will be disabled, resetting the cycle.
 *
 * # Examples
 *     const fn = debounced((x) => console.log(x), 1000);
 *     fn(1);// console: "1"
 *     fn(2);
 *     await sleep(800);
 *     fn(3);
 *     // (1 second later)
 *     // console: "3"
 *     fn(4); // console: "4"

 *     fn(5);
 *     // (1 second later)
 *     // console: "5"
 */
export const debounceImmediate = <T extends (...args: never[]) => void>(
    fn: T,
    delay: number
) => {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    return (...args: Parameters<T>): void => {
        let runImmediately = true;

        if (timeout !== null) {
            clearTimeout(timeout);
            runImmediately = false;
        }

        timeout = setTimeout(() => {
            timeout = null;
            if (!runImmediately) fn(...args);
        }, delay);

        if (runImmediately) fn(...args);
    };
};

/** Fetches the value of a browser cookie. */
export function getCookie(name: string): string | null {
    const nameLenPlus = name.length + 1;
    return (
        document.cookie
            .split(";")
            .map((c) => c.trim())
            .filter((cookie) => {
                return cookie.substring(0, nameLenPlus) === `${name}=`;
            })
            .map((cookie) => {
                return decodeURIComponent(cookie.substring(nameLenPlus));
            })[0] || null
    );
}

/** Deletes a browser cookie. */
export function deleteCookie(name: string) {
    document.cookie = `cookiename=${name}; expires=Sat, 20 Jan 1980 12:00:00 UTC`;

    const nameLenPlus = name.length + 1;
    return (
        document.cookie
            .split(";")
            .map((c) => c.trim())
            .filter((cookie) => {
                return cookie.substring(0, nameLenPlus) === `${name}=`;
            })
            .map((cookie) => {
                return decodeURIComponent(cookie.substring(nameLenPlus));
            })[0] || null
    );
}
