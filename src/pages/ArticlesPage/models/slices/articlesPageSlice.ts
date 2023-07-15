import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit'
import { StateSchema } from '@/app/providers/StoreProvider'
import {
    Article,
    ArticleSortField,
    ArticleSortFieldTypes,
    ArticleTypes,
    ArticleTypesType,
    ArticleView,
    ArticleViewTypes,
} from '@/entities/Article'
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from '@/shared/const/localstarage'
import { SortOrder } from '@/shared/types/sort'
import { ArticlesPageSchema } from '../types/articlesPageSchema'
import { fetchArticlesList } from '../../models/services/fetchArticlesList'

const articlesAdapter = createEntityAdapter<Article>({
    selectId: (article) => article.id,
})

export const getArticles = articlesAdapter.getSelectors<StateSchema>(
    (state) => state.articlesPage || articlesAdapter.getInitialState(),
)

const articlesPageSlice = createSlice({
    name: 'articlesPageSlice',
    initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
        view: ArticleView.CARDS,
        page: 1,
        hasMore: true,
        _inited: false,
        sort: ArticleSortField.ALL,
        order: 'asc',
        search: '',
        limit: 10,
        type: ArticleTypes.ALL,
    }),
    reducers: {
        setView: (state, action: PayloadAction<ArticleViewTypes>) => {
            state.view = action.payload
            state.limit = action.payload === ArticleView.LIST ? 4 : 10
            localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, action.payload)
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        },
        setOrder: (state, action: PayloadAction<SortOrder>) => {
            state.order = action.payload
        },
        setSort: (state, action: PayloadAction<ArticleSortFieldTypes>) => {
            state.sort = action.payload
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        },
        setType: (state, action: PayloadAction<ArticleTypesType>) => {
            state.type = action.payload
        },
        deleteData: (state, action) => {
            articlesAdapter.removeOne(state, action.payload)
        },
        upsertArticle: (state, action) => {
            articlesAdapter.upsertOne(state, action.payload)
        },
        initState: (state) => {
            const view = localStorage.getItem(
                ARTICLES_VIEW_LOCALSTORAGE_KEY,
            ) as ArticleViewTypes

            state.view = view
            state.limit = view === ArticleView.LIST ? 4 : 10

            state._inited = true
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticlesList.pending, (state, action) => {
                state.error = undefined
                state.isLoading = true

                if (action.meta.arg.replace) {
                    articlesAdapter.removeAll(state)
                }
            })
            .addCase(fetchArticlesList.fulfilled, (state, action) => {
                state.isLoading = false
                state.hasMore = action.payload.length >= state.limit

                if (action.meta.arg.replace) {
                    articlesAdapter.setAll(state, action.payload)
                } else {
                    articlesAdapter.addMany(state, action.payload)
                }
            })
            .addCase(fetchArticlesList.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    },
})

export const { reducer: articlesPageReducer } = articlesPageSlice
export const { actions: articlesPageActions } = articlesPageSlice
