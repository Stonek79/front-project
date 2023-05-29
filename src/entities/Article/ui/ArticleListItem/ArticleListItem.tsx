import React, { HTMLAttributeAnchorTarget, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Text } from '@/shared/ui/deprecated/Text'
import { Icon } from '@/shared/ui/deprecated/Icon'
import { Card } from '@/shared/ui/deprecated/Card'
import { Avatar } from '@/shared/ui/deprecated/Avatar'
import { Button } from '@/shared/ui/deprecated/Button'
import { AppLink } from '@/shared/ui/deprecated/AppLink'
import { AppImage } from '@/shared/ui/deprecated/AppImage'
import { Skeleton } from '@/shared/ui/deprecated/Skeleton'
import { classNames } from '@/shared/lib/classNames/classNames'
import ViewIcon from '@/shared/assets/icons/eye.svg'
import { ARTICLE_LIST_ITEM_ID_KEY } from '@/shared/const/localstarage'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent'
import {
    Article,
    ArticleTextBlock,
    ArticleViewTypes,
} from '../../model/types/article'
import cls from './ArticleListItem.module.scss'
import { ArticleBlockTypes, ArticleView } from '../../model/consts/consts'
import { getRouteArticleDetail } from '@/shared/const/router'

interface ArticleListItemProps {
    className?: string
    article: Article
    view: ArticleViewTypes
    target?: HTMLAttributeAnchorTarget
    index?: number
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
    const { className, article, view, target, index } = props

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
            <Card data-testid="ArticleListItem" className={cn}>
                <div className={cls.card}>
                    <header className={cls.header}>
                        <Avatar size={30} src={article.user.avatar} />
                        <Text
                            text={article.user.username}
                            className={cls.username}
                        />
                        <Text text={article.createdAt} className={cls.date} />
                    </header>
                    <Text text={article.title} className={cls.title} />
                    {types}
                    <AppImage
                        fallback={<Skeleton width="100%" height={250} />}
                        src={article.img}
                        alt={article.title}
                        className={cls.img}
                    />
                    {textBlock && (
                        <ArticleTextBlockComponent
                            block={textBlock}
                            className={cls.textBlock}
                        />
                    )}
                    <footer className={cls.footer}>
                        <AppLink
                            target={target}
                            to={getRouteArticleDetail(article.id)}
                        >
                            <Button onClick={onClickHandle}>
                                {t('Read more')}
                            </Button>
                        </AppLink>
                        {views}
                    </footer>
                </div>
            </Card>
        )
    }

    return (
        <AppLink
            data-testid="ArticleListItem"
            target={target}
            to={getRouteArticleDetail(article.id)}
        >
            <Card className={cn}>
                <div className={cls.card}>
                    <div className={cls.imageWrapper}>
                        <AppImage
                            fallback={<Skeleton width={200} height={200} />}
                            src={article.img}
                            alt={article.title}
                            className={cls.img}
                        />
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
