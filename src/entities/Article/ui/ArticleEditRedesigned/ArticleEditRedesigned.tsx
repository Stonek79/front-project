import { useSelector } from 'react-redux'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import {
    getArticleDetailsFormData,
    getArticleIsLoadingData,
} from '../../model/selectors/articleDetails'
import {
    articleDetailsActions,
    articleDetailsReducer,
} from '../../model/slice/articleDetailsSlice'
import { ArticleBlockTypes } from '../../model/consts/consts'
import { Card } from '@/shared/ui/redesigned/Card'
import {
    ArticleBlock,
    ArticleCodeBlock,
    ArticleImageBlock,
    ArticleTextBlock,
} from '../../model/types/article'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from '../ArticleDetailsRedesigned/ArticleDetailsRedesigned.module.scss'
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent'
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton'
import { Text } from '@/shared/ui/redesigned/Text'
import { AppImage } from '@/shared/ui/redesigned/AppImage'
import { Input } from '@/shared/ui/redesigned/Input'
import { ArticleEditProps } from '../ArticleEdit/ArticleEdit'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { ArticleDetailsMoveComponent } from '../ArticleDetailsMoveComponent/ArticleDetailsMoveComponent'

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
export const ArticleEditRedesigned = memo((props: ArticleEditProps) => {
    const { className, id } = props
    const { t } = useTranslation()

    const articleData = useSelector(getArticleDetailsFormData)
    const isLoading = useSelector(getArticleIsLoadingData)
    const dispatch = useAppDispatch()

    if (!articleData) {
        return null
    }

    const { blocks } = articleData
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

    const onChangeBlockCode = (value: string, block: ArticleCodeBlock) => {
        const blocks = articleData.blocks.map((item) => {
            if (item.type === block.type && item.id === block.id) {
                return { ...item, code: value }
            }
            return item
        })

        dispatch(
            articleDetailsActions.updateArticle({
                ...articleData,
                blocks,
            }),
        )
    }

    const onChangeBlockImageTitle = (
        value: string,
        block: ArticleImageBlock,
    ) => {
        const blocks = articleData.blocks.map((item) => {
            if (item.type === block.type && item.id === block.id) {
                return { ...item, title: value }
            }
            return item
        })

        dispatch(
            articleDetailsActions.updateArticle({
                ...articleData,
                blocks,
            }),
        )
    }

    const onChangeBlockImageSrc = (value: string, block: ArticleImageBlock) => {
        const blocks = articleData.blocks.map((item) => {
            if (item.type === block.type && item.id === block.id) {
                return { ...item, src: value }
            }
            return item
        })

        dispatch(
            articleDetailsActions.updateArticle({
                ...articleData,
                blocks,
            }),
        )
    }

    const onChangeBlockTextTitle = (value: string, block: ArticleTextBlock) => {
        const blocks = articleData.blocks.map((item) => {
            if (item.type === block.type && item.id === block.id) {
                return { ...item, title: value }
            }
            return item
        })

        dispatch(
            articleDetailsActions.updateArticle({
                ...articleData,
                blocks,
            }),
        )
    }

    const onChangeBlockTextParagraphs = (
        value: string,
        block: ArticleTextBlock,
    ) => {
        const blocks = articleData.blocks.map((item) => {
            if (item.type === block.type && item.id === block.id) {
                return { ...item, paragraphs: value.split('/n') }
            }
            return item
        })

        dispatch(
            articleDetailsActions.updateArticle({
                ...articleData,
                blocks,
            }),
        )
    }

    const handleMoveUp = (block: ArticleBlock) => {
        const position = blocks.indexOf(block)
        const tempBlocks = [...blocks]
        console.log(position)
        if (position === 0) return
        tempBlocks[position] = blocks[position - 1]
        tempBlocks[position - 1] = block

        console.log(tempBlocks)
        dispatch(
            articleDetailsActions.updateArticle({
                ...articleData,
                blocks: tempBlocks,
            }),
        )
    }
    const handleMoveDown = (block: ArticleBlock) => {
        const position = blocks.indexOf(block)
        const tempBlocks = [...blocks]
        console.log(position)
        if (position === blocks.length - 1) return
        tempBlocks[position] = blocks[position + 1]
        tempBlocks[position + 1] = block

        dispatch(
            articleDetailsActions.updateArticle({
                ...articleData,
                blocks: tempBlocks,
            }),
        )
    }

    const cn = classNames(cls.ArticleDetails, {}, [className])

    console.log(blocks)
    const renderBlock = (block: ArticleBlock) => {
        switch (block.type) {
            case ArticleBlockTypes.CODE:
                return (
                    <ArticleDetailsMoveComponent
                        handleMoveUp={() => handleMoveUp(block)}
                        handleMoveDown={() => handleMoveDown(block)}
                    >
                        <Card
                            cardBorder="none"
                            cardPaddings="24"
                            variant="light"
                            max
                        >
                            <ArticleCodeBlockComponent
                                key={block.id}
                                block={block}
                                textareaId={`${
                                    block.id + block.code.length
                                }edit`}
                                editCode={(value) =>
                                    onChangeBlockCode(value, block)
                                }
                                editable
                            />
                        </Card>
                    </ArticleDetailsMoveComponent>
                )
            case ArticleBlockTypes.IMAGE:
                return (
                    <ArticleDetailsMoveComponent
                        handleMoveUp={() => handleMoveUp(block)}
                        handleMoveDown={() => handleMoveDown(block)}
                    >
                        <Card
                            cardBorder="none"
                            cardPaddings="24"
                            variant="light"
                            max
                        >
                            <ArticleImageBlockComponent
                                key={block.id}
                                block={block}
                                editSrc={(value) =>
                                    onChangeBlockImageSrc(value, block)
                                }
                                editTitle={(value) =>
                                    onChangeBlockImageTitle(value, block)
                                }
                                editable
                            />
                        </Card>
                    </ArticleDetailsMoveComponent>
                )
            case ArticleBlockTypes.TEXT:
                return (
                    <ArticleDetailsMoveComponent
                        handleMoveUp={() => handleMoveUp(block)}
                        handleMoveDown={() => handleMoveDown(block)}
                    >
                        <Card
                            cardBorder="none"
                            cardPaddings="24"
                            variant="light"
                            max
                        >
                            <ArticleTextBlockComponent
                                gap="8"
                                key={block.id}
                                block={block}
                                editable
                                editParagraphFn={(value) =>
                                    onChangeBlockTextParagraphs(value, block)
                                }
                                editTitleFn={(value) =>
                                    onChangeBlockTextTitle(value, block)
                                }
                            />
                        </Card>
                    </ArticleDetailsMoveComponent>
                )
            default:
                return null
        }
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
                    {articleData?.blocks.map(renderBlock)}
                </VStack>
            </VStack>
        </VStack>
    )

    return (
        <DynamicModuleLoader reducers={articleDetailsReducers}>
            <Card max>{content}</Card>
        </DynamicModuleLoader>
    )
})
