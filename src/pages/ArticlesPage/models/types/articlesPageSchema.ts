import { EntityState } from '@reduxjs/toolkit'
import { SortOrder } from 'shared/types'
import {
    ArticleSortField, ArticleType, Article, ArticleView,
} from 'entities/Article'

export interface ArticlesPageSchema extends EntityState<Article>{
    isLoading?: boolean,
    error?: string,

    // pagination
    page: number
    limit: number
    hasMore: boolean

    // filters
    view: ArticleView
    order: SortOrder
    sort: ArticleSortField
    search: string
    type: ArticleType
    _inited: boolean
}
