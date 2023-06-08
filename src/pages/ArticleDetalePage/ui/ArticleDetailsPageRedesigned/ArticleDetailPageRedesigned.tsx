import { memo } from 'react'
import { useParams } from 'react-router-dom'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { classNames } from '@/shared/lib/classNames/classNames'
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { Page } from '@/widgets/Page'
import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList'
import { ArticleDetailsComments } from '../../ui/ArticleDetailsComments/ArticleDetailsComments'
import cls from './ArticleDetailPageRedesigned.module.scss'
import { ArticleRating } from '@/features/ArticleRating'
import { ArticleDetailPageProps } from '../ArticleDetailPage/ArticleDetailPage'
import { articleDetailsCommentReducers } from '../../model/slices/articleDetailCommentSlice'
import { StickyLayout } from '@/shared/layouts'
import { DetailsContainer } from '../DetailsContainer/DetailsContainer'
import { AdditionalInfoContainer } from '../AdditionInfoContainer/AdditionInfoContainer'

export const reducers: ReducersList = {
    comments: articleDetailsCommentReducers,
}
const ArticleDetailPageRedesigned = (props: ArticleDetailPageProps) => {
    const { className } = props
    const { id = '1' } = useParams<{ id: string }>()

    const cn = classNames(cls.ArticleDetailPage, {}, [className])

    const content = (
        <Page className={cn}>
            <VStack gap="16" max>
                <DetailsContainer />
                <ArticleRating articleId={id} />
                <ArticleRecommendationsList />
                <ArticleDetailsComments id={id} />
            </VStack>
        </Page>
    )
    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount={Boolean(true)}
        >
            <StickyLayout
                content={content}
                right={<AdditionalInfoContainer />}
            />
        </DynamicModuleLoader>
    )
}

export default memo(ArticleDetailPageRedesigned)