import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ArticlesFilters } from '@/widgets/ArticlesFilters'
import { useArticlesFilter } from '../../lib/hooks/useArticlesFilter'

interface FiltersContainerProps {
    className?: string
}

export const FiltersContainer = memo((props: FiltersContainerProps) => {
    const { className } = props

    const cn = classNames('', {}, [className])
    const {
        sort,
        order,
        onChangeOrder,
        onChangeSort,
        search,
        onChangeSearch,
        type,
        onChangeType,
    } = useArticlesFilter()

    return (
        <ArticlesFilters
            type={type}
            search={search}
            sort={sort}
            order={order}
            onChangeOrder={onChangeOrder}
            onChangeSort={onChangeSort}
            onChangeSearch={onChangeSearch}
            onChangeType={onChangeType}
            className={cn}
        />
    )
})
