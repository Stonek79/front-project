import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticlesFilters.module.scss'
import { Card } from '@/shared/ui/redesigned/Card'
import { ArticlesSortSelector } from '@/features/ArticlesSortSelector'
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs'
import { ArticleSortFieldTypes, ArticleTypesType } from '@/entities/Article'
import { SortOrder } from '@/shared/types/sort'
import { Input } from '@/shared/ui/redesigned/Input'
import SearchIcon from '@/shared/assets/icons/search.svg'
import { Icon } from '@/shared/ui/redesigned/Icon'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { AppLink } from '@/shared/ui/redesigned/AppLink'
import { getRouteArticleNew } from '@/shared/const/router'
import { getUserAuthData } from '@/entities/User'

interface ArticlesFiltersProps {
    className?: string
    sort: ArticleSortFieldTypes
    order: SortOrder
    type: ArticleTypesType
    search: string
    onChangeSearch: (value: string) => void
    onChangeOrder: (newOrder: SortOrder) => void
    onChangeSort: (newSort: ArticleSortFieldTypes) => void
    onChangeType: (type: ArticleTypesType) => void
}

export const ArticlesFilters = memo((props: ArticlesFiltersProps) => {
    const {
        className,
        onChangeSort,
        sort,
        onChangeSearch,
        search,
        onChangeType,
        type,
        onChangeOrder,
        order,
    } = props
    const { t } = useTranslation()
    const authData = useSelector(getUserAuthData)

    const cn = classNames(cls.ArticlesFilters, { [cls.withAuth]: !authData }, [
        className,
        cls.getVStack,
    ])

    return (
        <VStack gap="32">
            <Card className={cn} cardPaddings="24">
                <VStack gap="8">
                    <Input
                        addonLeft={<Icon Svg={SearchIcon} />}
                        value={search}
                        size="s"
                        onChange={onChangeSearch}
                        placeholder={t('Search')}
                    />
                    <ArticleTypeTabs
                        value={type}
                        onChangeType={onChangeType}
                        className={cls.tabs}
                    />
                    <ArticlesSortSelector
                        sort={sort}
                        order={order}
                        onChangeOrder={onChangeOrder}
                        onChangeSort={onChangeSort}
                    />
                </VStack>
            </Card>
            {authData && (
                <Card
                    variant="outline"
                    className={cls.cardLink}
                    cardPaddings="4"
                    max
                >
                    <AppLink to={getRouteArticleNew()}>
                        {t('Add New Article')}
                    </AppLink>
                </Card>
            )}
        </VStack>
    )
})
