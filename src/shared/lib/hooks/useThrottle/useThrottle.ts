import { useCallback, useRef } from 'react'

type Callback = (...args: any[]) => void

export const useThrottle = (callback: Callback, delay: number): Callback => {
    const timeoutRef = useRef(false)

    return useCallback(
        (...args: any[]) => {
            if (!timeoutRef.current) {
                callback(...args)

                timeoutRef.current = true

                setTimeout(() => {
                    timeoutRef.current = false
                }, delay)
            }
        },
        [callback, delay],
    )
}
