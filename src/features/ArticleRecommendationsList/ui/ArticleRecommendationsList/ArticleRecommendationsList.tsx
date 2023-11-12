import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Text } from '@/shared/ui/redesigned/Text'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ArticleList, ArticleView } from '@/entities/Article'
import { useArticlesRecommendationsList } from '../../api/ArticleRecommendationsApi'

interface ArticleRecommendationsListProps {
    className?: string
}
export const ArticleRecommendationsList = memo(
    (props: ArticleRecommendationsListProps) => {
        const { className } = props
        const { t } = useTranslation()
        const {
            data: articles,
            isLoading,
            error,
        } = useArticlesRecommendationsList(3)

        const cn = classNames('', {}, [className])

        if (error) {
            return (
                <HStack max align="center" className={cn}>
                    {t('Recommendations list error')}
                </HStack>
            )
        }

        return (
            <VStack
                data-testid="ArticleRecommendationsList"
                gap="8"
                max
                align="center"
                className={cn}
            >
                <Text size="l" title={t('Recommendations')} />
                <ArticleList
                    view={ArticleView.CARDS}
                    articles={articles || []}
                    isLoading={isLoading}
                    target="_blank"
                />
            </VStack>
        )
    },
)
