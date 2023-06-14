import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { memo } from 'react'
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import {
    articleDetailsActions,
    articleDetailsReducer,
} from '../../model/slice/articleDetailsSlice'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton'
import {
    getArticleDetailsFormData,
    getArticleIsLoadingData,
} from '../../model/selectors/articleDetails'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Card } from '@/shared/ui/redesigned/Card'
import { Text } from '@/shared/ui/redesigned/Text'
import { Input } from '@/shared/ui/redesigned/Input'
import { AppImage } from '@/shared/ui/redesigned/AppImage'
import cls from '../ArticleDetailsRedesigned/ArticleDetailsRedesigned.module.scss'
import { ArticleBlocksComponent } from '../ArticleBlocksComponent/ArticleBlocksComponent'

export interface ArticleEditProps {
    className?: string
    id: string
}

const articleDetailsReducers: ReducersList = {
    article: articleDetailsReducer,
}

const skeleton = (
    <VStack max gap="16">
        <Skeleton width={500} height={24} />
        <Skeleton width={300} height={32} />
        <Skeleton height={420} width="100%" />

        <Skeleton width="100%" height={200} />
        <Skeleton width="100%" height={200} />
    </VStack>
)

export const ArticleEdit = memo((props: ArticleEditProps) => {
    const { t } = useTranslation()

    const articleData = useSelector(getArticleDetailsFormData)
    const isLoading = useSelector(getArticleIsLoadingData)
    const dispatch = useAppDispatch()

    if (!articleData) {
        return null
    }

    const onChangeTitle = (value: string) => {
        dispatch(
            articleDetailsActions.updateArticle({
                ...articleData,
                title: value,
            }),
        )
    }

    const onChangeSubtitle = (value: string) => {
        dispatch(
            articleDetailsActions.updateArticle({
                ...articleData,
                subtitle: value,
            }),
        )
    }

    const onChangeMainImage = (value: string) => {
        dispatch(
            articleDetailsActions.updateArticle({
                ...articleData,
                img: value,
            }),
        )
    }

    const content = isLoading ? (
        skeleton
    ) : (
        <VStack max gap="16">
            <Card cardBorder="none" cardPaddings="24" variant="light" max>
                <VStack gap="16" max>
                    <Text title={articleData?.title} bold size="l" />
                    <Input
                        wrap
                        labelBold
                        label={`${t('Article Title')}:`}
                        value={articleData?.title}
                        onChange={onChangeTitle}
                    />
                </VStack>
                <VStack gap="16" max>
                    <Text title={articleData?.subtitle} size="m" />
                    <Input
                        wrap
                        labelBold
                        label={`${t('Article Subtitle')}:`}
                        value={articleData?.subtitle}
                        onChange={onChangeSubtitle}
                    />
                </VStack>
                <VStack gap="16" justify="center" max>
                    <AppImage
                        className={cls.img}
                        src={articleData?.img}
                        alt={articleData?.title}
                        fallback={
                            <Skeleton height={420} width="100%" border="16" />
                        }
                    />
                    <Input
                        wrap
                        labelBold
                        label={`${t('Image Path')}:`}
                        value={articleData?.img}
                        onChange={onChangeMainImage}
                    />
                </VStack>
            </Card>
            <VStack data-testid="ArticleDetails.body" gap="4" max>
                <VStack max gap="16" align="center">
                    <ArticleBlocksComponent articleData={articleData} />
                </VStack>
            </VStack>
        </VStack>
    )

    return (
        <DynamicModuleLoader
            reducers={articleDetailsReducers}
            removeAfterUnmount={false}
        >
            <Card max>{content}</Card>
        </DynamicModuleLoader>
    )
})
