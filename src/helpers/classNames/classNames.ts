
type Mods = Record<string, string | boolean>
export const classNames = (cn: string, modes: Mods, additional: string[]): string => {

    return [
        cn,
        ...additional,
        ...Object.entries(modes)
            .filter(([cn, value]) => Boolean(value))
            .map(([className]) => className)

    ]
        .join(' ')
}