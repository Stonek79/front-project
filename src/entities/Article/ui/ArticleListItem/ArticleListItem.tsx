import React, { HTMLAttributeAnchorTarget, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Text } from '@/shared/ui/Text'
import { Icon } from '@/shared/ui/Icon'
import ViewIcon from '@/shared/assets/icons/eye.svg'
import { Card } from '@/shared/ui/Card'
import { Avatar } from '@/shared/ui/Avatar'
import { Button } from '@/shared/ui/Button'
import { AppLink } from '@/shared/ui/AppLink'
import { ARTICLE_LIST_ITEM_ID_KEY } from '@/shared/const/localstarage'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent'
import {
    Article, ArticleTextBlock, ArticleViewTypes,
} from '../../model/types/article'
import cls from './ArticleListItem.module.scss'
import { ArticleBlockTypes, ArticleView } from '../../model/consts/consts';
import { getRouteArticleDetail } from '@/shared/const/router';

interface ArticleListItemProps {
    className?: string
    article: Article
    view: ArticleViewTypes
    target?: HTMLAttributeAnchorTarget
    index?: number
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
    const {
        className,
        article,
        view,
        target,
        index,
    } = props

    const { t } = useTranslation()

    const types = <Text text={article.type.join(', ')} className={cls.types} />
    const views = (
        <>
            <Text text={String(article.views)} className={cls.views} />
            <Icon Svg={ViewIcon} />
        </>
    )

    const onClickHandle = () => {
        sessionStorage.setItem(ARTICLE_LIST_ITEM_ID_KEY, JSON.stringify(index))
    }

    const cn = classNames('', {}, [className, cls[view]])

    if (view === ArticleView.LIST) {
        const textBlock = article.blocks.find(
            (block) => block.type === ArticleBlockTypes.TEXT,
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
                        <AppLink target={target} to={getRouteArticleDetail(article.id)}>
                            <Button onClick={onClickHandle}>{t('Read more')}</Button>
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
            to={getRouteArticleDetail(article.id)}
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
