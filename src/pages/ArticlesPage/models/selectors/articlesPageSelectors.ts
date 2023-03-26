import { StateSchema } from 'app/providers/StoreProvider'
import { ArticleView } from 'entities/Article'

export const getIsLoadingArticles = (state: StateSchema) => state.articlesPage?.isLoading || false
export const getArticlesPageError = (state: StateSchema) => state.articlesPage?.error || ''
export const getArticlesView = (state: StateSchema) => state.articlesPage?.view || ArticleView.CARDS
export const getArticlesPages = (state: StateSchema) => state.articlesPage?.page || 1
export const getArticlesLimit = (state: StateSchema) => state.articlesPage?.limit || 1
export const getArticlesHasMore = (state: StateSchema) => state.articlesPage?.hasMore
export const getArticlesPageInited = (state: StateSchema) => state.articlesPage?._inited
