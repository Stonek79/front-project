import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleEditAdditionBlock.module.scss'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { Avatar } from '@/shared/ui/redesigned/Avatar'
import { Text } from '@/shared/ui/redesigned/Text'
import { Button } from '@/shared/ui/redesigned/Button'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Article, articleDetailsActions, editArticle } from '@/entities/Article'

interface ArticleEditAdditionBlockProps {
    className?: string
    article: Article
}

export const ArticleEditAdditionBlock = memo(
    (props: ArticleEditAdditionBlockProps) => {
        const { className, article } = props
        const { t } = useTranslation()
        const dispatch = useAppDispatch()

        const cn = classNames(cls.ArticleEditAdditionInfo, {}, [className])
        const { views, createdAt, user, id } = article

        const onCancelEdit = useCallback(() => {
            dispatch(articleDetailsActions.cancelEdit())
        }, [dispatch])

        const onSave = useCallback(() => {
            if (article) dispatch(editArticle(article))
        }, [article, dispatch])

        return (
            <VStack gap="32" className={cn}>
                <HStack gap="8">
                    <Avatar src={user.avatar} size={32} />
                    <Text text={user.username} bold />
                    <Text text={createdAt} />
                </HStack>
                <Button variant="outline" color="error" onClick={onCancelEdit}>
                    {t('Cancel edit')}
                </Button>
                <Button variant="outline" color="success" onClick={onSave}>
                    {t('Save')}
                </Button>
                <Text text={t('{{count}} views', { count: views })} />
            </VStack>
        )
    },
)
