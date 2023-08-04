import { memo } from 'react'
import { Article, ArticleBlock } from '../../model/types/article'
import { ArticleDetailsMoveComponent } from '../ArticleDetailsMoveComponent/ArticleDetailsMoveComponent'
import { Card } from '@/shared/ui/redesigned/Card'
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent'
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent'
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

        const { blocks } = articleData

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
                            <ArticleCodeBlockComponent block={block} editable />
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
                        blocks={blocks}
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
