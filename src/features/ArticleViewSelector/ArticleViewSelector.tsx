import { classNames } from 'shared/lib/classNames/classNames'
import { memo } from 'react'
import { ArticleView } from 'entities/Article'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Icon } from 'shared/ui/Icon/Icon'
import cls from './ArticleViewSelector.module.scss'
import CardsIcon from '../../shared/assets/icons/cards-icon.svg'
import ListIcon from '../../shared/assets/icons/list-icon.svg'

interface ArticleViewSelectorProps {
    className?: string
    view: ArticleView
    onViewClick?: (view: ArticleView) => void
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

    const onClick = (newView: ArticleView) => () => {
        onViewClick?.(newView)
    }
    return (
        <div>
            {viewTypes.map((type) => (
                <Button
                    onClick={onClick(type.view)}
                    theme={ButtonTheme.CLEAR}

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
