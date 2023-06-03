import { memo } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { Card as CardDeprecated, CardTheme } from '@/shared/ui/deprecated/Card'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ArticleDetails } from '@/entities/Article'
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { Page } from '@/widgets/Page'
import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList'
import { ArticleDetailsComments } from '../../ui/ArticleDetailsComments/ArticleDetailsComments'
import cls from './ArticleDetailPageDeprecated.module.scss'
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader'
import { ArticleRating } from '@/features/ArticleRating'
import { ToggleComponentFeatures } from '@/shared/lib/features'
import { ArticleDetailPageProps } from '../ArticleDetailPage/ArticleDetailPage'
import { articleDetailsCommentReducers } from '../../model/slices/articleDetailCommentSlice'

export const reducers: ReducersList = {
    comments: articleDetailsCommentReducers,
}

const ArticleDetailPageDeprecated = (props: ArticleDetailPageProps) => {
    const { className } = props
    const { id = '1' } = useParams<{ id: string }>()
    const { t } = useTranslation()

    const cn = classNames(cls.ArticleDetailPage, {}, [className])

    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount={Boolean(true)}
        >
            <Page className={cn}>
                <VStack gap="16" max>
                    <ArticleDetailsPageHeader />
                    <ArticleDetails id={id} />
                    <ToggleComponentFeatures
                        feature="isArticleRatingEnabled"
                        on={<ArticleRating articleId={id} />}
                        off={
                            <CardDeprecated max theme={CardTheme.NORMAL}>
                                {t('Article rating is in progress')}
                            </CardDeprecated>
                        }
                    />
                    <ArticleRecommendationsList />
                    <ArticleDetailsComments id={id} />
                </VStack>
            </Page>
        </DynamicModuleLoader>
    )
}

export default memo(ArticleDetailPageDeprecated)
