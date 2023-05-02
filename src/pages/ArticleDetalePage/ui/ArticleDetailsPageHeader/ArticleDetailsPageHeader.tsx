import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button } from '@/shared/ui/Button/Button'
import { classNames } from '@/shared/lib/classNames/classNames'
import { getArticleDetailsData } from '@/entities/Article'
import { HStack } from '@/shared/ui/Stack'
import { getCanEditArticle } from '../../model/selectors/article'
import { RoutePath } from '@/shared/const/router';

interface ArticleDetailsPageHeaderProps {
    className?: string
}

export const ArticleDetailsPageHeader = memo((props: ArticleDetailsPageHeaderProps) => {
    const { className } = props
    const { t } = useTranslation()
    const navigate = useNavigate()
    const isEdit = useSelector(getCanEditArticle)
    const article = useSelector(getArticleDetailsData)

    const cn = classNames('', {}, [className])

    const onBackToArticles = useCallback(() => {
        navigate(RoutePath.articles)
    }, [navigate])

    const onEditArticle = useCallback(() => {
        navigate(`${RoutePath.articles}/${article?.id}/edit`)
    }, [article?.id, navigate])

    return (
        <HStack max justify="between" className={cn}>
            <Button onClick={onBackToArticles}>
                {t('Back to articles')}
            </Button>
            {isEdit && (
                <Button onClick={onEditArticle}>
                    { t('Edit article') }
                </Button>
            )}
        </HStack>
    )
})
