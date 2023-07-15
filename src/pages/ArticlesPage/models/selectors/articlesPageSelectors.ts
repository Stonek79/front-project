import { StateSchema } from '@/app/providers/StoreProvider'
import { ArticleSortField, ArticleTypes, ArticleView } from '@/entities/Article'
import { buildSelector } from '@/shared/lib/helpers/store'

export const getIsLoadingArticles = (state: StateSchema) =>
    state.articlesPage?.isLoading || false
export const getArticlesPageError = (state: StateSchema) =>
    state.articlesPage?.error || ''
export const getArticlesView = (state: StateSchema) =>
    state.articlesPage?.view || ArticleView.CARDS
export const getArticlesPages = (state: StateSchema) =>
    state.articlesPage?.page || 1
export const getArticlesLimit = (state: StateSchema) =>
    state.articlesPage?.limit || 10
export const getArticlesHasMore = (state: StateSchema) =>
    state.articlesPage?.hasMore
export const getArticlesPageInited = (state: StateSchema) =>
    state.articlesPage?._inited

export const getArticlesPageSort = (state: StateSchema) =>
    state.articlesPage?.sort ?? ArticleSortField.ALL

export const getArticlesPageOrder = (state: StateSchema) =>
    state.articlesPage?.order ?? 'asc'

export const getArticlesPageSearch = (state: StateSchema) =>
    state.articlesPage?.search ?? ''

export const getArticlesPageType = (state: StateSchema) =>
    state.articlesPage?.type ?? ArticleTypes.ALL

export const [useArticleItemById] = buildSelector(
    (state, id: string) => state.articlesPage?.entities[id],
)
