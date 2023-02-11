type Mods = Record<string, boolean | string>

export const classNames = (cls: string, additional: string[] = [], mods: Mods = {}): string => [
    cls,
    ...additional,
    ...Object.entries(mods)
        .filter(([_, value]) => Boolean(value))
        .map(([className]) => className),
]
    .join(' ')
