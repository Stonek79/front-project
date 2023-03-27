import { classNames } from 'shared/lib/classNames/classNames'
import {
    memo, MutableRefObject, ReactNode, useRef, UIEvent,
} from 'react'
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { StateSchema } from 'app/providers/StoreProvider'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { useThrottle } from 'shared/lib/hooks/useThrottle/useThrottle'
import { scrollSafeActions } from '../../model/slices/scrollSafeSlice'
import { getSafeScrollByPAth } from '../../model/selectors/getSafeScroll'
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

    const dispatch = useAppDispatch()
    const { pathname } = useLocation()
    const scrollPosition = useSelector((state: StateSchema) => getSafeScrollByPAth(state, pathname))
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>
    const cn = classNames(cls.Page, {}, [className])

    useInfiniteScroll({
        triggerRef,
        wrapperRef,
        isLoading,
        callback: onScrollEnd,
    })

    useInitialEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition
    })

    const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
        dispatch(scrollSafeActions.setScrollPosition({
            position: e.currentTarget.scrollTop,
            path: pathname,
        }))
    }, 500)

    return (
        <section
            ref={wrapperRef}
            className={cn}
            onScroll={onScroll}
        >
            {children}
            {!isLoading && (<div className={cls.trigger} ref={triggerRef} />)}
        </section>
    )
})
