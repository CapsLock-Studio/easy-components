type OmitUndefined<T> = {
    [P in keyof T]: NonNullable<T[P]>;
};
export declare const omitUndefined: <T>(obj: T) => OmitUndefined<T>;
export {};
