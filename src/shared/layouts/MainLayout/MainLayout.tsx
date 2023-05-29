import { memo, ReactElement } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './MainLayout.module.scss'

interface MainLayoutProps {
    className?: string
    header: ReactElement
    content: ReactElement
    sidebar: ReactElement
    toolbar?: ReactElement
}

export const MainLayout = memo((props: MainLayoutProps) => {
    const { className, header, content, toolbar, sidebar } = props

    const cn = classNames(cls.MainLayout, {}, [className])

    return (
        <div className={cn}>
            <div className={cls.sidebar}>{sidebar}</div>
            <div className={cls.content}>{content}</div>
            <div className={cls.rightbar}>
                <div className={cls.header}>{header}</div>
                <div className={cls.toolbar}>{toolbar}</div>
            </div>
        </div>
    )
})
