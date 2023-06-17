import { memo } from 'react'
import { nanoid } from 'nanoid'
import {
    Article,
    ArticleBlock,
    ArticleCodeBlock,
    ArticleImageBlock,
    ArticleTextBlock,
} from '../../model/types/article'
import { ArticleDetailsMoveComponent } from '../ArticleDetailsMoveComponent/ArticleDetailsMoveComponent'
import { Card } from '@/shared/ui/redesigned/Card'
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent'
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { articleDetailsActions } from '../../model/slice/articleDetailsSlice'
import { ArticleBlockTypes } from '../../model/consts/consts'

interface ArticleBlocksComponentProps {
    className?: string
    articleData: Article
    setIsOpen: () => void
    setData: (data: any) => void
}

export const ArticleBlocksComponent = memo(
    (props: ArticleBlocksComponentProps) => {
        const { articleData, setIsOpen, setData } = props
        const dispatch = useAppDispatch()

        const { blocks } = articleData

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

        const onChangeBlockImageSrc = (
            value: string,
            block: ArticleImageBlock,
        ) => {
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

        const onChangeBlockTextTitle = (
            value: string,
            block: ArticleTextBlock,
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

        const renderBlock = (block: ArticleBlock) => {
            switch (block.type) {
                case ArticleBlockTypes.CODE:
                    return (
                        <Card
                            cardBorder="none"
                            cardPaddings="24"
                            variant="light"
                            max
                        >
                            <ArticleCodeBlockComponent
                                block={block}
                                textareaId={nanoid(10)}
                                editCode={(value) =>
                                    onChangeBlockCode(value, block)
                                }
                                editable
                            />
                        </Card>
                    )
                case ArticleBlockTypes.IMAGE:
                    return (
                        <Card
                            cardBorder="none"
                            cardPaddings="24"
                            variant="light"
                            max
                        >
                            <ArticleImageBlockComponent
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
                    )
                case ArticleBlockTypes.TEXT:
                    return (
                        <Card
                            cardBorder="none"
                            cardPaddings="24"
                            variant="light"
                            max
                        >
                            <ArticleTextBlockComponent
                                gap="8"
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
                    )
                default:
                    return null
            }
        }

        return (
            <>
                {blocks.map((block) => (
                    <ArticleDetailsMoveComponent
                        key={block.id}
                        articleData={articleData}
                        block={block}
                        setIsOpen={setIsOpen}
                        setData={setData}
                    >
                        {renderBlock(block)}
                    </ArticleDetailsMoveComponent>
                ))}
            </>
        )
    },
)
