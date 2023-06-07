import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Text } from '@/shared/ui/redesigned/Text'
import { Icon } from '@/shared/ui/redesigned/Icon'
import { Card } from '@/shared/ui/redesigned/Card'
import { Avatar } from '@/shared/ui/redesigned/Avatar'
import { Button } from '@/shared/ui/redesigned/Button'
import { AppLink } from '@/shared/ui/redesigned/AppLink'
import { AppImage } from '@/shared/ui/redesigned/AppImage'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton'
import { classNames } from '@/shared/lib/classNames/classNames'
import ViewIcon from '@/shared/assets/icons/eye.svg'
import { ARTICLE_LIST_ITEM_ID_KEY } from '@/shared/const/localstarage'
import { ArticleTextBlock } from '../../model/types/article'
import cls from './ArticleListItemRedesigned.module.scss'
import { ArticleBlockTypes, ArticleView } from '../../model/consts/consts'
import { getRouteArticleDetail } from '@/shared/const/router'
import { ArticleListItemProps } from '../ArticleListItem/ArticleListItem'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'

export const ArticleListItemRedesigned = memo((props: ArticleListItemProps) => {
    const { className, article, view, target, index } = props

    const { t } = useTranslation()

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

    const onClickHandle = () => {
        sessionStorage.setItem(ARTICLE_LIST_ITEM_ID_KEY, JSON.stringify(index))
    }

    const cn = classNames('', {}, [className, cls[view]])

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
                        className={cls.img}
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
            <Card className={cn} cardBorder="standard">
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
