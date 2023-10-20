import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { classNames } from '@/shared/lib/classNames/classNames'
import { getArticleDetailsData } from '@/entities/Article'
import { getCanEditArticle } from '../../model/selectors/article'
import { getRouteArticleEdit, getRouteArticles } from '@/shared/const/router'
import { Button } from '@/shared/ui/redesigned/Button'

interface ArticleDetailsPageHeaderProps {
    className?: string
}

export const ArticleDetailsPageHeader = memo(
    (props: ArticleDetailsPageHeaderProps) => {
        const { className } = props
        const { t } = useTranslation()
        const navigate = useNavigate()
        const isEdit = useSelector(getCanEditArticle)
        const article = useSelector(getArticleDetailsData)

        const cn = classNames('', {}, [className])

        const onBackToArticles = useCallback(() => {
            navigate(getRouteArticles())
        }, [navigate])

        const onEditArticle = useCallback(() => {
            if (article) {
                navigate(getRouteArticleEdit(article.id))
            }
        }, [article, navigate])

        return (
            <HStack max justify="between" className={cn}>
                <Button onClick={onBackToArticles}>
                    {t('Back to articles')}
                </Button>
                {isEdit && (
                    <Button onClick={onEditArticle}>{t('Edit article')}</Button>
                )}
            </HStack>
        )
    },
)
