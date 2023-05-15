export function createOptionsList<T extends object>(opt: T) {
    return Object.entries(opt).map(([k, v]) => ({ value: k, content: v }))
}
