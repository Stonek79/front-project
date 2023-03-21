import { classNames } from 'shared/lib/classNames/classNames'
import { HTMLAttributes, memo, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import cls from './Card.module.scss'

interface CardProps extends HTMLAttributes<HTMLDivElement>{
    className?: string
    children?: ReactNode
}

export const Card = memo((props: CardProps) => {
    const { className, children, ...otherProps } = props
    const { t } = useTranslation()

    const cn = classNames(cls.Card, {}, [className])

    return (
        <div {...otherProps} className={cn}>
            {children}
        </div>
    )
})
