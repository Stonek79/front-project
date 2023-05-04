import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ArticleView, ArticleViewTypes } from '@/entities/Article'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { Icon } from '@/shared/ui/Icon'
import cls from './ArticleViewSelector.module.scss'
import CardsIcon from '../../../shared/assets/icons/cards-icon.svg'
import ListIcon from '../../../shared/assets/icons/list-icon.svg'

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

    const onClick = (newView: ArticleViewTypes) => () => {
        onViewClick?.(newView)
    }
    return (
        <div className={cls.ArticleViewSelector}>
            {viewTypes.map((type) => (
                <Button
                    onClick={onClick(type.view)}
                    theme={ButtonTheme.CLEAR}
                    className={cls.iconBtn}

                >
                    <Icon
                        Svg={type.icon}
                        className={classNames('', { [cls.selected]: type.view !== view }, [className])}
                    />
                </Button>
            ))}
        </div>
    )
})
