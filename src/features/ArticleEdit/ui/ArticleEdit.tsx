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
import { ConfirmationModal } from '../../ConfirmationModal'
import {
    ArticleBlocksComponent,
    articleDetailsActions,
    articleDetailsReducer,
    getArticleDetailsFormData,
    getArticleIsLoadingData,
    Article,
} from '@/entities/Article'
import { ArticleEditImgBlock } from './ArticleEditImgBlock/ArticleEditImgBlock'
import { ArticleEditTitleBlock } from './ArticleEditTitleBlock/ArticleEditTitleBlock'
import { ArticleEditSubtitleBlock } from './ArticleEditSubtitleBlock/ArticleEditSubtitleBlock'
import { ArticleEditTypeBlock } from './ArticleEditTypeBlock/ArticleEditTypeBlock'

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

    const onOpenModal = () => {
        setIsOpen(true)
    }

    const onCloseModal = () => {
        setIsOpen(false)
    }

    const handleDeleteBlock = () => {
        if (articleData) {
            const withRemovedBlock = articleData.blocks.filter(
                (item) => item.id !== data.id,
            )

            dispatch(
                articleDetailsActions.updateArticleBlocks(withRemovedBlock),
            )

            setIsOpen(false)
        }
    }

    const content =
        isLoading || !articleData ? (
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
                    <ArticleEditTitleBlock title={articleData?.title} />
                    <ArticleEditSubtitleBlock
                        subtitle={articleData?.subtitle}
                    />
                    <ArticleEditImgBlock
                        imgPath={articleData?.img}
                        title={articleData?.title}
                    />
                    <ArticleEditTypeBlock types={articleData?.type} />
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
