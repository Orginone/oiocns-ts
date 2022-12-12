/**
 * 按引用传递变量，和vue的Ref保持兼容
 */
export interface ByRef<T> {
    value: T;
}

/**
 * 按引用传递只读变量
 */
export interface ReadonlyRef<T> {
    readonly value: T;
}

export function ref<T>(initValue: T): ByRef<T> {
    const ret: ByRef<T> = {} as any;
    Object.defineProperty(ret, "value", {
        enumerable: true,
        configurable: false,
        value: initValue,
        writable: true
    });
    return ret;
}

export function readonlyRef<T>(initValue: T): ByRef<T> {
    const ret: ByRef<T> = {} as any;
    Object.defineProperty(ret, "value", {
        enumerable: true,
        configurable: false,
        value: initValue,
        writable: false
    });
    return ret;
}

export function isRefLike(obj: any): obj is ByRef<unknown> {
    return typeof obj === "object" && obj.value;
}