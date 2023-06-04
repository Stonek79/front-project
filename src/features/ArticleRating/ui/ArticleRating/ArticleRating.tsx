import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleRating.module.scss'
import { RatingCard } from '@/entities/Rating'
import { useArticleRating, useRateArticle } from '../../api/ArticleRatingApi'
import { getUserAuthData } from '@/entities/User'

export interface ArticleRatingProps {
    className?: string
    articleId: string
}

const ArticleRating = memo((props: ArticleRatingProps) => {
    const { className, articleId } = props
    const { t } = useTranslation()
    const userData = useSelector(getUserAuthData)
    const { data, isLoading } = useArticleRating({
        articleId,
        userId: userData?.id ?? '',
    })

    const [rateArticleMutation] = useRateArticle()

    const handleRateArticle = useCallback(
        (rate: number, feedback?: string) => {
            try {
                rateArticleMutation({
                    articleId,
                    userId: userData?.id ?? '',
                    feedback,
                    starRate: rate,
                })
            } catch (e) {
                console.log(e)
            }
        },
        [articleId, rateArticleMutation, userData?.id],
    )

    const onAccept = useCallback(
        (starsCount: number, feedback?: string) => {
            handleRateArticle(starsCount, feedback)
        },
        [handleRateArticle],
    )

    const onCancel = useCallback(
        (starsCount: number) => {
            handleRateArticle(starsCount)
        },
        [handleRateArticle],
    )

    if (isLoading) {
        return <Skeleton width="100%" height={140} />
    }

    const cn = classNames(cls.ArticleRating, {}, [className])

    const rating = data?.[0]?.starRate ?? 0
    return (
        <RatingCard
            onAccept={onAccept}
            onCancel={onCancel}
            className={cn}
            title={t('Rate the article')}
            feedbackTitle={t('We will glad to get your vote')}
            hasFeedback
            starRate={rating}
        />
    )
})

export default ArticleRating
