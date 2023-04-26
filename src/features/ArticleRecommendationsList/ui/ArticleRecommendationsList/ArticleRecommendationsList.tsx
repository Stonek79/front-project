import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Text, TextSize } from '@/shared/ui/Text/Text'
import { ArticleList, ArticleView } from '@/entities/Article'
import { VStack } from '@/shared/ui/Stack'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { useArticlesRecommendationsList } from '../../api/ArticleRecommendationsApi'

interface ArticleRecommendationsListProps {
    className?: string
}
export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
    const { className } = props
    const { t } = useTranslation()
    const {
        data: articles,
        isLoading,
        error,
    } = useArticlesRecommendationsList(3)

    if (error || !articles || !articles.length) {
        return (<NotFoundPage />)
    }

    const cn = classNames('', {}, [className])

    return (
        <VStack gap="8" max align="center" className={cn}>
            <Text
                size={TextSize.L}
                title={t('Recommendations')}
            />
            <ArticleList
                view={ArticleView.CARDS}
                articles={articles}
                isLoading={isLoading}
                target="_blank"
            />
        </VStack>
    )
})
