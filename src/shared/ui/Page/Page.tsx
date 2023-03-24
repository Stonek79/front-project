import { classNames } from 'shared/lib/classNames/classNames'
import {
    memo, MutableRefObject, ReactNode, useRef,
} from 'react'
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll'
import cls from './Page.module.scss'

interface PageProps {
    className?: string
    children: ReactNode
    onScrollEnd?: () => void
    isLoading?: boolean
}

export const Page = memo((props: PageProps) => {
    const {
        className,
        children,
        onScrollEnd,
        isLoading,
    } = props

    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>
    const cn = classNames(cls.Page, {}, [className])

    useInfiniteScroll({
        triggerRef,
        wrapperRef,
        isLoading,
        callback: onScrollEnd,
    })

    return (
        <section ref={wrapperRef} className={cn}>
            {children}
            {!isLoading && (<div ref={triggerRef} />)}
        </section>
    )
})
