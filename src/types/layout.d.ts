export type CSSStyles<T> = {
    [key in keyof T]? : T[key]
}
