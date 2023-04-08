import { classNames } from 'shared/lib/classNames/classNames'
import React, { HTMLAttributeAnchorTarget, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Text } from 'shared/ui/Text/Text'
import { Icon } from 'shared/ui/Icon/Icon'
import ViewIcon from 'shared/assets/icons/eye.svg'
import { Card } from 'shared/ui/Card/Card'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { Button } from 'shared/ui/Button/Button'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { AppLink } from 'shared/ui/AppLink/AppLink'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent'
import {
    Article, ArticleBlockType, ArticleTextBlock, ArticleView,
} from '../../model/types/article'
import cls from './ArticleListItem.module.scss'

interface ArticleListItemProps {
    className?: string
    article: Article
    view: ArticleView
    target?: HTMLAttributeAnchorTarget
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
    const {
        className,
        article,
        view,
        target,
    } = props

    const { t } = useTranslation()

    const types = <Text text={article.type.join(', ')} className={cls.types} />
    const views = (
        <>
            <Text text={String(article.views)} className={cls.views} />
            <Icon Svg={ViewIcon} />
        </>
    )

    const cn = classNames('', {}, [className, cls[view]])

    if (view === ArticleView.LIST) {
        const textBlock = article.blocks.find(
            (block) => block.type === ArticleBlockType.TEXT,
        ) as ArticleTextBlock

        return (
            <Card className={cn}>
                <div className={cls.card}>
                    <header className={cls.header}>
                        <Avatar size={30} src={article.user.avatar} />
                        <Text text={article.user.username} className={cls.username} />
                        <Text text={article.createdAt} className={cls.date} />
                    </header>
                    <Text text={article.title} className={cls.title} />
                    {types}
                    <img src={article.img} alt={article.title} className={cls.img} />
                    {textBlock && (
                        <ArticleTextBlockComponent block={textBlock} className={cls.textBlock} />
                    )}
                    <footer className={cls.footer}>
                        <AppLink target={target} to={RoutePath.article_details + article.id}>
                            <Button>{t('Read more')}</Button>
                        </AppLink>
                        {views}
                    </footer>
                </div>
            </Card>
        )
    }

    return (
        <AppLink
            target={target}
            to={RoutePath.article_details + article.id}
        >
            <Card className={cn}>
                <div className={cls.card}>
                    <div className={cls.imageWrapper}>
                        <img src={article.img} alt={article.title} className={cls.img} />
                        <Text text={article.createdAt} className={cls.date} />
                    </div>
                    <div className={cls.infoWrapper}>
                        {types}
                        {views}
                    </div>
                </div>
                <Text text={article.title} className={cls.title} />
            </Card>
        </AppLink>
    )
})
