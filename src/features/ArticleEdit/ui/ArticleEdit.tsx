import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { memo, useState } from 'react'
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Card } from '@/shared/ui/redesigned/Card'
import { Text } from '@/shared/ui/redesigned/Text'
import { Input } from '@/shared/ui/redesigned/Input'
import { AppImage } from '@/shared/ui/redesigned/AppImage'
import { ConfirmationModal } from '../../ConfirmationModal'
import {
    ArticleTypesType,
    ArticleBlocksComponent,
    articleDetailsActions,
    articleDetailsReducer,
    getArticleDetailsFormData,
    getArticleIsLoadingData,
    Article,
} from '@/entities/Article'
import { ArticleTypeSelector } from './ArticleTypeSelector'
import cls from './ArticleEdit.module.scss'

export interface ArticleEditProps {
    className?: string
    id?: string
    articleBaseData?: Article
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
    const { articleBaseData } = props
    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const articleData =
        useSelector(getArticleDetailsFormData) || articleBaseData
    const isLoading = useSelector(getArticleIsLoadingData)

    const [isOpen, setIsOpen] = useState(false)
    const [data, setData] = useState<any>('')

    if (!articleData) {
        return null
    }

    const onOpenModal = () => {
        setIsOpen(true)
    }

    const onCloseModal = () => {
        setIsOpen(false)
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

    const onAddType = (value: ArticleTypesType) => {
        const newTypes = new Set([...articleData.type, value])
        const types = Array.from(newTypes)

        dispatch(
            articleDetailsActions.updateArticle({
                ...articleData,
                type: types,
            }),
        )
    }

    const onRemoveType = (value: ArticleTypesType) => {
        const types = articleData.type.filter((type) => type !== value)

        dispatch(
            articleDetailsActions.updateArticle({
                ...articleData,
                type: types,
            }),
        )
    }

    const handleDeleteBlock = () => {
        const withRemovedBlock = articleData.blocks.filter(
            (item) => item.id !== data.id,
        )

        dispatch(
            articleDetailsActions.updateArticle({
                ...articleData,
                blocks: withRemovedBlock,
            }),
        )

        setIsOpen(false)
    }

    const content = isLoading ? (
        skeleton
    ) : (
        <VStack max gap="16">
            <Card
                cardBorder="none"
                gap="8"
                cardPaddings="24"
                variant="light"
                max
            >
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
                        value={articleData.img}
                        onChange={onChangeMainImage}
                    />
                </VStack>
                <VStack gap="16" max>
                    <ArticleTypeSelector
                        onRemoveType={onRemoveType}
                        types={articleData.type}
                        onAddType={onAddType}
                    />
                </VStack>
            </Card>
            <VStack data-testid="ArticleDetails.body" gap="4" max>
                <VStack max gap="16" align="center">
                    <ArticleBlocksComponent
                        setIsOpen={onOpenModal}
                        articleData={articleData}
                        setData={setData}
                    />
                </VStack>
            </VStack>
        </VStack>
    )

    return (
        <DynamicModuleLoader
            reducers={articleDetailsReducers}
            removeAfterUnmount={Boolean(false)}
        >
            <Card max>{content}</Card>
            {isOpen && (
                <ConfirmationModal
                    header={`${t('Delete block')}?`}
                    isOpen={isOpen}
                    onClose={onCloseModal}
                    onConfirm={handleDeleteBlock}
                />
            )}
        </DynamicModuleLoader>
    )
})
