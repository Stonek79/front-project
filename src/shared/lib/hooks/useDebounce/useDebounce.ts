import { MutableRefObject, useCallback, useRef } from 'react'

type Callback = (...args: any[]) => void;

export const useDebounce = (callback: Callback, delay: number) => {
    const timer = useRef() as MutableRefObject<any>

    return useCallback((...args) => {
        if (timer.current) {
            clearTimeout(timer.current)
        }

        timer.current = setTimeout(() => {
            callback(...args)
        }, delay)
    }, [callback, delay])
}
