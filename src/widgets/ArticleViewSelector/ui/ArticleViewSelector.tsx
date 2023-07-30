import { memo } from 'react'
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button'
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ArticleView, ArticleViewTypes } from '@/entities/Article'
import cls from './ArticleViewSelector.module.scss'
import CardsIconDeprecated from '@/shared/assets/icons/tiled-24-24.svg'
import ListIconDeprecated from '@/shared/assets/icons/list-24-24.svg'

import CardsIcon from '@/shared/assets/icons/tile.svg'
import ListIcon from '@/shared/assets/icons/burger.svg'
import { ToggleComponentFeatures, toggleFeatures } from '@/shared/lib/features'
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
        icon: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => CardsIcon,
            off: () => CardsIconDeprecated,
        }),
    },
    {
        view: ArticleView.LIST,
        icon: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => ListIcon,
            off: () => ListIconDeprecated,
        }),
    },
]
export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
    const { className, view, onViewClick } = props

    const cn = classNames(cls.ArticleViewSelector, {}, [className])
    const onClick = (newView: ArticleViewTypes) => () => {
        onViewClick?.(newView)
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }
    return (
        <ToggleComponentFeatures
            feature="isAppRedesigned"
            on={
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
            }
            off={
                <div className={cls.ArticleViewSelector}>
                    {viewTypes.map((type) => (
                        <ButtonDeprecated
                            key={type.view}
                            onClick={onClick(type.view)}
                            theme={ButtonTheme.CLEAR}
                            className={cls.iconBtn}
                        >
                            <IconDeprecated
                                Svg={type.icon}
                                width={24}
                                height={24}
                                className={classNames(
                                    '',
                                    { [cls.selected]: type.view !== view },
                                    [className],
                                )}
                            />
                        </ButtonDeprecated>
                    ))}
                </div>
            }
        />
    )
})
