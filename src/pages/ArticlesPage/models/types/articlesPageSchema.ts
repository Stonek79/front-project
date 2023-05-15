import { EntityState } from '@reduxjs/toolkit'
import { SortOrder } from '@/shared/types/sort'
import {
    Article,
    ArticleViewTypes,
    ArticleSortFieldTypes,
    ArticleTypesType,
} from '@/entities/Article'

export interface ArticlesPageSchema extends EntityState<Article> {
    isLoading?: boolean
    error?: string

    // pagination
    page: number
    limit: number
    hasMore: boolean

    // filters
    view: ArticleViewTypes
    order: SortOrder
    sort: ArticleSortFieldTypes
    search: string
    type: ArticleTypesType
    _inited: boolean
}
