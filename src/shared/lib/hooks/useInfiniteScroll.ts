import { MutableRefObject, useRef } from 'react'
import { useInitialEffect } from './useInitialEffect/useInitialEffect'

export interface UseInfiniteScrollOptions {
    callback?: () => void
    triggerRef: MutableRefObject<HTMLElement>
    wrapperRef?: MutableRefObject<HTMLElement>
    isLoading?: boolean
}

export function useInfiniteScroll({
    callback,
    wrapperRef,
    triggerRef,
    isLoading,
}: UseInfiniteScrollOptions) {
    const observer = useRef<IntersectionObserver | null>(null)

    useInitialEffect(() => {
        const wrapperElement = wrapperRef?.current || null
        const triggerElement = triggerRef.current

        if (callback && !isLoading) {
            const options = {
                root: wrapperElement,
                rootMargin: '0px',
                threshold: 1.0,
            }

            observer.current = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    callback()
                    console.log('END')
                }
            }, options)

            observer.current.observe(triggerElement)
        }

        return () => {
            if (observer.current && triggerElement) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.current.unobserve(triggerElement)
            }
        }
    }, [callback, isLoading, triggerRef, wrapperRef])
}
