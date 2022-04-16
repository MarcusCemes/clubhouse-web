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
        .filter((x) => !!x)
        .join(" ");
}

function isObject(x: unknown): x is { [index: string]: unknown } {
    return typeof x === "object" && x !== null;
}

export function isArray<T>(x: unknown): x is Array<T> {
    return x instanceof Array;
}

export function isTruthy<T>(value: T | null | false | undefined): value is T {
    return !!value;
}
