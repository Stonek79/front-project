import { CounterSchema } from 'entities/Counter'
import { UserSchema } from 'entities/User'
import { LoginSchema } from 'features/AuthByUsername'
import {
    AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit'
import { ProfileSchema } from 'entities/Profile'
import { AxiosInstance } from 'axios'
import { ArticleDetailsRecommendationsSchema, ArticleDetailsSchema } from 'entities/Article'
import { ArticleDetailsCommentsSchema } from 'pages/ArticleDetalePage'
import { AddCommentFormSchema } from 'features/addCommentForm'
import { ArticlesPageSchema } from 'pages/ArticlesPage'
import { ScrollSafeSchema } from 'widgets/Page'

export interface StateSchema {
    counter: CounterSchema
    user: UserSchema
    scrollPosition: ScrollSafeSchema

    // async reducers
    loginForm?: LoginSchema
    profile?: ProfileSchema
    article?: ArticleDetailsSchema
    comments?: ArticleDetailsCommentsSchema
    commentForm?: AddCommentFormSchema
    articlesPage?: ArticlesPageSchema
    articlesRecommendations?: ArticleDetailsRecommendationsSchema
}

export type StateSchemaKeys = keyof StateSchema

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>
    add: (key: StateSchemaKeys, reducer: Reducer) => void
    remove: (key: StateSchemaKeys) => void
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema
}
