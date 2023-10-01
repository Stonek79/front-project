import { memo, ReactElement } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './StickyLayout.module.scss'

interface StickyLayoutProps {
    className?: string
    left?: ReactElement
    right?: ReactElement
    content?: ReactElement
}

export const StickyLayout = memo((props: StickyLayoutProps) => {
    const { className, content, left, right } = props

    const cn = classNames(cls.StickyLayout, {}, [className])

    return (
        <div className={cn}>
            {left && <div className={cls.left}>{left}</div>}
            <div className={cls.content}>{content}</div>
            {right && <div className={cls.right}>{right}</div>}
        </div>
    )
})
