import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Text, TextSize } from '@/shared/ui/Text'
import { ArticleList, ArticleView } from '@/entities/Article'
import { HStack, VStack } from '@/shared/ui/Stack'
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

    const cn = classNames('', {}, [className])

    if (error || !articles || !articles.length) {
        return (
            <HStack max align="center" className={cn}>
                {t('Recommendations list error')}
            </HStack>
        );
    }

    return (
        <VStack gap="8" max align="center" className={cn}>
            <Text
                size={TextSize.L}
                title={t('Recommendations')}
            />
            <ArticleList
                view={ArticleView.CARDS}
                articles={articles || []}
                isLoading={isLoading}
                target="_blank"
            />
        </VStack>
    )
})
