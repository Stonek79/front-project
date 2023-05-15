import { MutableRefObject, useCallback, useRef } from 'react'

/**
 * A hook that allows you to cancel the previous function call until the delay expires
 * @param callback
 * @param delay - in mc
 */

type Callback = (...args: any[]) => void

export const useDebounce = (callback: Callback, delay: number) => {
    const timer = useRef() as MutableRefObject<any>

    return useCallback(
        (...args: any[]) => {
            if (timer.current) {
                clearTimeout(timer.current)
            }

            timer.current = setTimeout(() => {
                callback(...args)
            }, delay)
        },
        [callback, delay],
    )
}
