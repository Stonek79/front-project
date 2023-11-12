import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Card } from '@/shared/ui/redesigned/Card'
import { Input } from '@/shared/ui/redesigned/Input'
import { ArticleViewSelector } from '@/widgets/ArticleViewSelector'
import { ArticlesSortSelector } from '@/features/ArticlesSortSelector'
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs'
import cls from './ArticlesPageFilters.module.scss'
import { useArticlesFilter } from '../../lib/hooks/useArticlesFilter'

interface ArticlesPageFiltersProps {
    className?: string
}

export const ArticlesPageFilters = memo((props: ArticlesPageFiltersProps) => {
    const { className } = props
    const { t } = useTranslation()

    const {
        sort,
        order,
        onChangeOrder,
        onChangeSort,
        view,
        onChangeView,
        search,
        onChangeSearch,
        type,
        onChangeType,
    } = useArticlesFilter()

    return (
        <div className={className}>
            <div className={cls.sortWrapper}>
                <ArticlesSortSelector
                    sort={sort}
                    order={order}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
                <ArticleViewSelector view={view} onViewClick={onChangeView} />
            </div>
            <Card className={cls.search}>
                <Input
                    value={search}
                    onChange={onChangeSearch}
                    placeholder={t('Search')}
                />
            </Card>
            <ArticleTypeTabs
                value={type}
                onChangeType={onChangeType}
                className={cls.tabs}
            />
        </div>
    )
})
