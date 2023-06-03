import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text'
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon'
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card'
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar'
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button'
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink'
import { AppImage } from '@/shared/ui/redesigned/AppImage'
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton'
import { classNames } from '@/shared/lib/classNames/classNames'
import ViewIcon from '@/shared/assets/icons/eye.svg'
import { ARTICLE_LIST_ITEM_ID_KEY } from '@/shared/const/localstarage'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent'
import { ArticleTextBlock } from '../../model/types/article'
import cls from './ArticleListItemDeprecated.module.scss'
import { ArticleBlockTypes, ArticleView } from '../../model/consts/consts'
import { getRouteArticleDetail } from '@/shared/const/router'
import { ArticleListItemProps } from '../ArticleListItem/ArticleListItem'

export const ArticleListItemDeprecated = memo((props: ArticleListItemProps) => {
    const { className, article, view, target, index } = props

    const { t } = useTranslation()

    const types = (
        <TextDeprecated text={article.type.join(', ')} className={cls.types} />
    )
    const views = (
        <>
            <TextDeprecated
                text={String(article.views)}
                className={cls.views}
            />
            <IconDeprecated Svg={ViewIcon} />
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
            <CardDeprecated data-testid="ArticleListItem" className={cn}>
                <div className={cls.card}>
                    <header className={cls.header}>
                        <AvatarDeprecated size={30} src={article.user.avatar} />
                        <TextDeprecated
                            text={article.user.username}
                            className={cls.username}
                        />
                        <TextDeprecated
                            text={article.createdAt}
                            className={cls.date}
                        />
                    </header>
                    <TextDeprecated
                        text={article.title}
                        className={cls.title}
                    />
                    {types}
                    <AppImage
                        fallback={
                            <SkeletonDeprecated width="100%" height={250} />
                        }
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
                        <AppLinkDeprecated
                            target={target}
                            to={getRouteArticleDetail(article.id)}
                        >
                            <ButtonDeprecated onClick={onClickHandle}>
                                {t('Read more')}
                            </ButtonDeprecated>
                        </AppLinkDeprecated>
                        {views}
                    </footer>
                </div>
            </CardDeprecated>
        )
    }

    return (
        <AppLinkDeprecated
            data-testid="ArticleListItem"
            target={target}
            to={getRouteArticleDetail(article.id)}
        >
            <CardDeprecated className={cn}>
                <div className={cls.card}>
                    <div className={cls.imageWrapper}>
                        <AppImage
                            fallback={
                                <SkeletonDeprecated width={200} height={200} />
                            }
                            src={article.img}
                            alt={article.title}
                            className={cls.img}
                        />
                        <TextDeprecated
                            text={article.createdAt}
                            className={cls.date}
                        />
                    </div>
                    <div className={cls.infoWrapper}>
                        {types}
                        {views}
                    </div>
                </div>
                <TextDeprecated text={article.title} className={cls.title} />
            </CardDeprecated>
        </AppLinkDeprecated>
    )
})
