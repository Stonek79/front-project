import { memo } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'
import { ArticleView, ArticleViewTypes } from '@/entities/Article'
import cls from './ArticleViewSelector.module.scss'

import CardsIcon from '@/shared/assets/icons/tile.svg'
import ListIcon from '@/shared/assets/icons/burger.svg'
import { Icon } from '@/shared/ui/redesigned/Icon'
import { Card } from '@/shared/ui/redesigned/Card'

interface ArticleViewSelectorProps {
    className?: string
    view: ArticleViewTypes
    onViewClick?: (view: ArticleViewTypes) => void
}

const viewTypes = [
    {
        view: ArticleView.CARDS,
        icon: CardsIcon,
    },
    {
        view: ArticleView.LIST,
        icon: ListIcon,
    },
]
export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
    const { className, view, onViewClick } = props

    const cn = classNames(cls.ArticleViewSelector, {}, [className])
    const onClick = (newView: ArticleViewTypes) => () => {
        onViewClick?.(newView)
        window.scrollTo({
            top: 0,
            behavior: 'auto',
        })
    }
    return (
        <Card cardPaddings="8" cardBorder="rounded" className={cn}>
            {viewTypes.map((type) => (
                <Icon
                    clickable
                    active={type.view !== view}
                    key={type.view}
                    Svg={type.icon}
                    onClick={onClick(type.view)}
                    className={classNames(
                        '',
                        { [cls.selected]: type.view !== view },
                        [className],
                    )}
                />
            ))}
        </Card>
    )
})
