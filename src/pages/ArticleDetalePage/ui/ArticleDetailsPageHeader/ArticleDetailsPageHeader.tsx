import { classNames } from 'shared/lib/classNames/classNames'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from 'shared/ui/Button/Button'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getArticleDetailsData } from 'entities/Article'
import cls from './ArticleDetailsPageHeader.module.scss'
import { getCanEditArticle } from '../../model/selectors/article'

interface ArticleDetailsPageHeaderProps {
    className?: string
}

export const ArticleDetailsPageHeader = memo((props: ArticleDetailsPageHeaderProps) => {
    const { className } = props
    const { t } = useTranslation()
    const navigate = useNavigate()
    const isEdit = useSelector(getCanEditArticle)
    const article = useSelector(getArticleDetailsData)

    const cn = classNames(cls.ArticleDetailsPageHeader, {}, [className])

    const onBackToArticles = useCallback(() => {
        navigate(RoutePath.articles)
    }, [navigate])

    const onEditArticle = useCallback(() => {
        navigate(`${RoutePath.articles}/${article?.id}/edit`)
    }, [article?.id, navigate])

    return (
        <div className={cn}>
            <Button onClick={onBackToArticles}>
                {t('Back to articles')}
            </Button>
            {isEdit && (
                <Button
                    className={cls.editBtn}
                    onClick={onEditArticle}
                >
                    { t('Edit article') }
                </Button>
            )}
        </div>
    )
})
