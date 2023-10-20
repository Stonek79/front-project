import { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ArticleSortField, ArticleSortFieldTypes } from '@/entities/Article'
import { SortOrder } from '@/shared/types/sort'
import { ListBox } from '@/shared/ui/redesigned/Popups'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { Text } from '@/shared/ui/redesigned/Text'

interface SelectOption<T extends string> {
    value: T
    content: string
}

interface ArticlesSortSelectorProps {
    className?: string
    sort: ArticleSortFieldTypes
    order: SortOrder
    onChangeOrder: (newOrder: SortOrder) => void
    onChangeSort: (newSort: ArticleSortFieldTypes) => void
}

export const ArticlesSortSelector = memo((props: ArticlesSortSelectorProps) => {
    const { className, onChangeSort, sort, onChangeOrder, order } = props
    const { t } = useTranslation()

    const orderOptions = useMemo<SelectOption<SortOrder>[]>(
        () => [
            {
                value: 'asc',
                content: t('ascending'),
            },
            {
                value: 'desc',
                content: t('descending'),
            },
        ],
        [t],
    )

    const sortFieldOptions = useMemo<SelectOption<ArticleSortFieldTypes>[]>(
        () => [
            {
                value: ArticleSortField.ALL,
                content: t('by default'),
            },
            {
                value: ArticleSortField.CREATED,
                content: t('by creating'),
            },
            {
                value: ArticleSortField.TITLE,
                content: t('by title'),
            },
            {
                value: ArticleSortField.VIEW,
                content: t('by views'),
            },
        ],
        [t],
    )

    return (
        <VStack gap="8">
            <Text text={`${t('Sort by')}:`} />
            <ListBox
                value={sort}
                onChange={onChangeSort}
                items={sortFieldOptions}
                direction="top right"
            />
            <ListBox
                value={order}
                onChange={onChangeOrder}
                items={orderOptions}
                direction="top right"
            />
        </VStack>
    )
})
