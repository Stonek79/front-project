import { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Select, SelectOptions } from '@/shared/ui/deprecated/Select'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ArticleSortField, ArticleSortFieldTypes } from '@/entities/Article'
import { SortOrder } from '@/shared/types/sort'
import cls from './ArticlesSortSelector.module.scss'

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

    const cn = classNames(cls.ArticlesSortSelector, {}, [className])

    const orderOptions = useMemo<SelectOptions<SortOrder>[]>(
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

    const sortFieldOptions = useMemo<SelectOptions<ArticleSortFieldTypes>[]>(
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
        <div className={cn}>
            <Select<ArticleSortFieldTypes>
                value={sort}
                onChange={onChangeSort}
                options={sortFieldOptions}
                label={t('Sort by')}
                className={cls.select}
            />
            <Select
                value={order}
                onChange={onChangeOrder}
                options={orderOptions}
                label={t('Order')}
                className={cls.select}
            />
        </div>
    )
})
