import { memo, ReactElement } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './MainLayout.module.scss'
import { useResize } from '@/shared/lib/hooks/useResize/useResize'

interface MainLayoutProps {
    className?: string
    header: ReactElement
    content: ReactElement
    sidebar: ReactElement
    toolbar?: ReactElement
}

export const MainLayout = memo((props: MainLayoutProps) => {
    const { className, header, content, toolbar, sidebar } = props

    const { isScreenSm } = useResize()

    const cn = classNames(cls.MainLayout, {}, [className])

    return isScreenSm ? (
        <div className={cn}>
            <div className={cls.sidebar}>{sidebar}</div>
            <div className={cls.content}>{content}</div>
            <div className={cls.rightbar}>
                <div className={cls.header}>{header}</div>
                <div className={cls.toolbar}>{toolbar}</div>
            </div>
        </div>
    ) : (
        <div className={cls.mobile}>
            <div className={cls.mobileHeader}>{header}</div>
            <div className={cls.content}>{content}</div>
            <div className={cls.toolbar}>{toolbar}</div>
        </div>
    )
})
