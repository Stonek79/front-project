import { memo } from 'react'
import { nanoid } from 'nanoid'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleAddBlocksContainer.module.scss'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { Button } from '@/shared/ui/redesigned/Button'
import { Text } from '@/shared/ui/redesigned/Text'
import {
    Article,
    ArticleBlockTypes,
    ArticleBlockTypesType,
    articleDetailsActions,
    NewArticleCodeBlock,
    NewArticleImageBlock,
    NewArticleTextBlock,
} from '@/entities/Article'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'

interface ArticleAddBlocksContainerProps {
    className?: string
    articleData: Article
}

const newBlocks = {
    [ArticleBlockTypes.TEXT]: {
        ...NewArticleTextBlock,
    },
    [ArticleBlockTypes.IMAGE]: {
        ...NewArticleImageBlock,
    },
    [ArticleBlockTypes.CODE]: {
        ...NewArticleCodeBlock,
    },
}

export const ArticleAddBlocksContainer = memo(
    (props: ArticleAddBlocksContainerProps) => {
        const { className, articleData } = props
        const dispatch = useAppDispatch()
        const { t } = useTranslation()

        const cn = classNames(cls.ArticleAddBlocksContainer, {}, [className])

        const addBlock = (type: ArticleBlockTypesType) => {
            const newBlock = { ...newBlocks[type], id: nanoid(10) }
            const blocks = [newBlock, ...articleData.blocks]

            dispatch(
                articleDetailsActions.updateArticle({
                    ...articleData,
                    blocks,
                } as Article),
            )
        }

        return (
            <VStack gap="8" className={cn}>
                <Text title={`${t('Add')}:`} />
                <Button
                    fullWidth
                    onClick={() => addBlock(ArticleBlockTypes.IMAGE)}
                >
                    {t('Add Image')}
                </Button>
                <Button
                    fullWidth
                    onClick={() => addBlock(ArticleBlockTypes.CODE)}
                >
                    {t('Add Code')}
                </Button>
                <Button
                    fullWidth
                    onClick={() => addBlock(ArticleBlockTypes.TEXT)}
                >
                    {t('Add Text')}
                </Button>
            </VStack>
        )
    },
)
