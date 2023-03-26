import { useCallback, useState } from 'react'

export const useTrottle = (callback: (...args: any[]) => void, delay: number) => {
    const [trottle, setTrottle] = useState(false)

    return useCallback((...args: any[]) => {
        if (!trottle) {
            callback(...args)

            setTrottle(true)

            setTimeout(() => {
                setTrottle(false)
            }, delay)
        }
    }, [callback, delay, trottle])
}
