import { MutableRefObject, ReactNode, useRef, UIEvent } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { StateSchema } from '@/app/providers/StoreProvider'
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect'
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle'
import { scrollSafeActions } from '../../model/slices/scrollSafeSlice'
import { getSafeScrollByPAth } from '../../model/selectors/getSafeScroll'
import cls from './Page.module.scss'
import { TestProps } from '@/shared/types/tests'

interface PageProps extends TestProps {
    className?: string
    children: ReactNode
    onScrollEnd?: () => void
    isLoading?: boolean
}

export const Page = (props: PageProps) => {
    const { className, children, onScrollEnd, isLoading } = props

    const dispatch = useAppDispatch()
    const { pathname } = useLocation()
    const scrollPosition = useSelector((state: StateSchema) =>
        getSafeScrollByPAth(state, pathname),
    )

    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>
    const designedClass = cls.PageRedesigne

    const cn = classNames(designedClass, {}, [className])

    window.onscroll = useThrottle(() => {
        if (pathname === '/articles') {
            const position =
                document.scrollingElement?.scrollTop || scrollPosition
            dispatch(
                scrollSafeActions.setScrollPosition({
                    position,
                    path: pathname,
                }),
            )
        }
    }, 500)

    useInfiniteScroll({
        triggerRef,
        wrapperRef: undefined,
        isLoading,
        callback: onScrollEnd,
    })

    useInitialEffect(() => {
        window.scrollTo({
            top: scrollPosition,
            behavior: 'auto',
        })
    })

    const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
        dispatch(
            scrollSafeActions.setScrollPosition({
                position: e.currentTarget.scrollTop,
                path: pathname,
            }),
        )
    }, 500)

    return (
        <main
            ref={wrapperRef}
            className={cn}
            onScroll={onScroll}
            /* eslint-disable-next-line react/destructuring-assignment */
            data-testid={props['data-testid'] ?? 'Page'}
        >
            {children}
            {!isLoading && <div className={cls.trigger} ref={triggerRef} />}
        </main>
    )
}
