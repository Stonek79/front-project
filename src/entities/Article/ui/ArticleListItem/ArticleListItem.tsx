import React, { HTMLAttributeAnchorTarget, memo } from 'react'
import { useTranslation } from 'react-i18next'
import {
    Article,
    ArticleTextBlock,
    ArticleViewTypes,
} from '../../model/types/article'
import { useResize } from '@/shared/lib/hooks/useResize/useResize'
import { ArticleBlockTypes, ArticleView } from '../../model/consts/consts'
import { Avatar } from '@/shared/ui/redesigned/Avatar'
import cls from './ArticleListItem.module.scss'
import { Text } from '@/shared/ui/redesigned/Text'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { Icon } from '@/shared/ui/redesigned/Icon'
import ViewIcon from '@/shared/assets/icons/eye.svg'
import { ARTICLE_LIST_ITEM_ID_KEY } from '@/shared/const/localstarage'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AppLink } from '@/shared/ui/redesigned/AppLink'
import { getRouteArticleDetail } from '@/shared/const/router'
import { Card } from '@/shared/ui/redesigned/Card'
import { AppImage } from '@/shared/ui/redesigned/AppImage'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton'
import { Button } from '@/shared/ui/redesigned/Button'
import { useEditArticleViewMutation } from '../../api/articlesApi'

export interface ArticleListItemProps {
    className?: string
    article: Article
    view: ArticleViewTypes
    target?: HTMLAttributeAnchorTarget
    index?: number
    updateViews?: (article: Article) => void
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
    const { className, article, view, target, index, updateViews } = props
    const { isScreenSm } = useResize()
    const { t } = useTranslation()

    const [editArticleView] = useEditArticleViewMutation()

    const userInfo = (
        <>
            <Avatar
                className={cls.avatar}
                size={32}
                src={article.user.avatar}
            />
            <Text bold text={article.user.username} />
        </>
    )
    const views = (
        <HStack gap="8">
            <Icon Svg={ViewIcon} />
            <Text text={String(article.views)} className={cls.views} />
        </HStack>
    )

    const handleArticlesViewCount = () => {
        const { views, user, ...rest } = article

        if (updateViews && !user?.roles?.includes('admin'))
            editArticleView({
                ...rest,
                views: views + 1,
            })
                .unwrap()
                .then((article) => updateViews(article))
    }

    const onClickHandle = () => {
        sessionStorage.setItem(ARTICLE_LIST_ITEM_ID_KEY, JSON.stringify(index))
        handleArticlesViewCount()
    }

    const currentView = !isScreenSm ? ArticleView.LIST : view
    const cn = classNames('', {}, [className, cls[currentView]])
    const cnImg = classNames(cls.img, { [cls.mobile]: !isScreenSm })

    if (!isScreenSm) {
        return (
            <AppLink
                data-testid="ArticleListItem"
                target={target}
                to={getRouteArticleDetail(article.id)}
                className={cn}
            >
                <Card
                    onClick={handleArticlesViewCount}
                    cardPaddings="24"
                    data-testid="ArticleListItem"
                    max
                >
                    <VStack max gap="16">
                        <HStack justify="between" gap="8" max>
                            <HStack gap="8">
                                {userInfo}
                                <Text text={article.createdAt} />
                            </HStack>
                            {views}
                        </HStack>
                        <Text text={article.title} bold />
                        <Text text={article.subtitle} bold size="s" />
                        <AppImage
                            fallback={<Skeleton width="100%" height={250} />}
                            src={article.img}
                            alt={article.title}
                            className={cnImg}
                        />
                    </VStack>
                </Card>
            </AppLink>
        )
    }

    if (view === ArticleView.LIST) {
        const textBlock = article.blocks.find(
            (block) => block.type === ArticleBlockTypes.TEXT,
        ) as ArticleTextBlock

        return (
            <Card
                cardPaddings="24"
                data-testid="ArticleListItem"
                max
                className={cn}
            >
                <VStack max gap="16">
                    <HStack gap="8">
                        {userInfo}
                        <Text text={article.createdAt} />
                    </HStack>
                    <Text text={article.title} bold />
                    <Text text={article.subtitle} bold size="s" />
                    <AppImage
                        fallback={<Skeleton width="100%" height={250} />}
                        src={article.img}
                        alt={article.title}
                        className={cnImg}
                    />
                    {textBlock && (
                        <Text
                            className={cls.textBlock}
                            text={textBlock.paragraphs.join()}
                        />
                    )}
                    <HStack max justify="between" gap="8">
                        <AppLink
                            target={target}
                            to={getRouteArticleDetail(article.id)}
                        >
                            <Button variant="outline" onClick={onClickHandle}>
                                {t('Read more')}
                            </Button>
                        </AppLink>
                        {views}
                    </HStack>
                </VStack>
            </Card>
        )
    }

    return (
        <AppLink
            data-testid="ArticleListItem"
            target={target}
            to={getRouteArticleDetail(article.id)}
        >
            <Card
                clickable
                onClick={handleArticlesViewCount}
                className={cn}
                cardBorder="standard"
            >
                <AppImage
                    fallback={<Skeleton width="100%" height={200} />}
                    src={article.img}
                    alt={article.title}
                    className={cls.img}
                />
                <VStack className={cls.info} gap="4" max>
                    <Text text={article.title} />
                    <VStack className={cls.footer} max gap="4">
                        <HStack justify="between" max>
                            <Text
                                text={article.createdAt}
                                className={cls.date}
                            />
                            {views}
                        </HStack>
                        <HStack gap="4" max>
                            {userInfo}
                        </HStack>
                    </VStack>
                </VStack>
            </Card>
        </AppLink>
    )
})
