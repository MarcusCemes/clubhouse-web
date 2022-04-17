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
