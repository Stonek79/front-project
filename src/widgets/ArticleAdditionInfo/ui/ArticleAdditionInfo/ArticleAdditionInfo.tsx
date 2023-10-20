import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleAdditionInfo.module.scss'
import { getUserAuthData, User } from '@/entities/User'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { Avatar } from '@/shared/ui/redesigned/Avatar'
import { Text } from '@/shared/ui/redesigned/Text'
import { Button } from '@/shared/ui/redesigned/Button'
import { getArticleDetailsData } from '@/entities/Article'
import { getRouteArticles } from '@/shared/const/router'
import { useResize } from '@/shared/lib/hooks/useResize/useResize'

interface ArticleAdditionInfoProps {
    className?: string
    author: User
    createdAt: string
    views: number
    onEdit: () => void
}

export const ArticleAdditionInfo = memo((props: ArticleAdditionInfoProps) => {
    const { className, author, views, createdAt, onEdit } = props
    const { t } = useTranslation()
    const authData = useSelector(getUserAuthData)
    const articleData = useSelector(getArticleDetailsData)
    const navigate = useNavigate()
    const { isScreenSm } = useResize()

    const canEdit =
        authData?.id === (articleData?.userId || articleData?.user.id) ||
        authData?.roles?.includes('admin')

    const onBackToArticles = useCallback(() => {
        navigate(getRouteArticles())
    }, [navigate])

    const cn = classNames(cls.ArticleAdditionInfo, {}, [className])

    return isScreenSm ? (
        <VStack gap="32" className={cn}>
            <HStack gap="8">
                <Avatar src={author.avatar} size={32} />
                <Text text={author.username} bold />
                <Text text={createdAt} />
            </HStack>
            <Button disabled={!canEdit} onClick={onEdit}>
                {t('Edit article')}
            </Button>
            <Button onClick={onBackToArticles}>{t('Back to articles')}</Button>
            <Text text={t('{{count}} views', { count: views })} />
        </VStack>
    ) : (
        <HStack justify="between">
            <VStack gap="4" align="center">
                <HStack gap="4" max>
                    <Avatar src={author.avatar} size={32} />
                    <Text text={author.username} bold />
                </HStack>
                <Text text={createdAt} />
                <Text text={t('{{count}} views', { count: views })} />
            </VStack>
            <VStack gap="8" align="end">
                <Button
                    fullWidth
                    disabled={!canEdit}
                    size="s"
                    variant="filled"
                    onClick={onEdit}
                >
                    {t('Edit article')}
                </Button>
                <Button
                    fullWidth
                    onClick={onBackToArticles}
                    variant="filled"
                    size="s"
                >
                    {t('Back to articles')}
                </Button>
            </VStack>
        </HStack>
    )
})
