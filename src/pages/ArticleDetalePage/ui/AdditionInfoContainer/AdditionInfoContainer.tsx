import { memo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Card } from '@/shared/ui/redesigned/Card'
import { ArticleAdditionInfo } from '@/widgets/ArticleAdditionInfo'
import { getArticleDetailsData } from '@/entities/Article'
import cls from './AdditionalInfoContainer.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { getRouteArticleEdit } from '@/shared/const/router'
import { useResize } from '@/shared/lib/hooks/useResize/useResize'

interface DetailsContainerProps {
    className?: string
}

export const AdditionalInfoContainer = memo((props: DetailsContainerProps) => {
    const { className } = props
    const article = useSelector(getArticleDetailsData)
    const navigate = useNavigate()
    const { isScreenSm } = useResize()

    const cn = classNames(cls.AdditionalInfoContainer, {}, [className])

    const onEditArticle = useCallback(() => {
        if (article) {
            navigate(getRouteArticleEdit(article.id))
        }
    }, [article, navigate])

    if (!article) return null

    const { views, createdAt, user } = article

    return isScreenSm ? (
        <Card className={cn} cardPaddings="24">
            <ArticleAdditionInfo
                onEdit={onEditArticle}
                views={views}
                createdAt={createdAt}
                author={user}
            />
        </Card>
    ) : (
        <Card className={cls.mobile} cardPaddings="8">
            <ArticleAdditionInfo
                onEdit={onEditArticle}
                views={views}
                createdAt={createdAt}
                author={user}
            />
        </Card>
    )
})
