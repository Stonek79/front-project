import { ArticleTypeSelector } from '../ArticleTypeSelector'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { articleDetailsActions, ArticleTypesType } from '@/entities/Article'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'

interface ArticleEditTypeBlockProps {
    types: ArticleTypesType[]
}

export const ArticleEditTypeBlock = ({ types }: ArticleEditTypeBlockProps) => {
    const dispatch = useAppDispatch()

    const onAddType = (value: ArticleTypesType) => {
        if (types) {
            const newTypes = new Set([...types, value])
            const currentTypes = Array.from(newTypes)

            dispatch(articleDetailsActions.updateArticleType(currentTypes))
        }
    }

    const onRemoveType = (value: ArticleTypesType) => {
        if (types) {
            const currentTypes = types.filter((type) => type !== value)

            dispatch(articleDetailsActions.updateArticleType(currentTypes))
        }
    }

    return (
        <VStack gap="16" max>
            <ArticleTypeSelector
                onRemoveType={onRemoveType}
                types={types}
                onAddType={onAddType}
            />
        </VStack>
    )
}
