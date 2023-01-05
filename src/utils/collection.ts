
export function sum(list: Iterable<number>): number {
    let s = 0;
    for (const num of list) {
        s += num;
    }
    return s;
}