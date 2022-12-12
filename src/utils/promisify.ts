export type RestTypes<T> = T extends [any, ...infer R] ? R : never;
export type AnyFunction = (...args: any[]) => any;

type CallbackFirstFunction<T extends [...any], F extends AnyFunction> = (
    callback: (...args: T) => any,
    ...otherParams: RestTypes<Parameters<F>>
) => any;

/**
 * 回调方法转异步，回调在第一个参数，错误处理方式为try...catch...
 * @param original 要包装的通过传回调返回的方法
 * @returns 包装后的异步方法
 */
 export function promisify<T extends [...any]>(original: CallbackFirstFunction<T, AnyFunction>) {
    function fn(this: any, ...args: any[]) {
        return new Promise<T>((resolve, reject) => {
            args.unshift((...argsret: T) => resolve(argsret));
            try {
                Reflect.apply(original, this, args);
            } catch (error) {
                reject(error);
            }
        });
    }
    return fn as any as (...args: RestTypes<Parameters<typeof original>>) => Promise<T>;
}