import {
    AnyAction,
    CombinedState,
    EnhancedStore,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit'
import { AxiosInstance } from 'axios'
import { AddCommentFormSchema } from 'src/features/AddCommentForm'
import { UserSchema } from '@/entities/User'
import { LoginSchema } from '@/features/AuthByUsername'
import {
    ArticleDetailsRecommendationsSchema,
    ArticleDetailsSchema,
} from '@/entities/Article'
import { ArticleDetailsCommentsSchema } from '@/pages/ArticleDetalePage'
import { ArticlesPageSchema } from '@/pages/ArticlesPage'
import { ScrollSafeSchema } from '@/widgets/Page'
import { rtkApi } from '@/shared/api/rtkApi'
import { ProfileSchema } from '@/features/ProfilePageEdit'
import { SignUpSchema } from '@/features/SignUpNewUser'

export interface StateSchema {
    user: UserSchema
    scrollPosition: ScrollSafeSchema
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>

    // async reducers
    loginForm?: LoginSchema
    signUpForm?: SignUpSchema
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
    reduce: (
        state: StateSchema,
        action: AnyAction,
    ) => CombinedState<StateSchema>
    add: (key: StateSchemaKeys, reducer: Reducer) => void
    remove: (key: StateSchemaKeys) => void
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager
}

export interface ThunkExtraArg {
    api: AxiosInstance
}

export interface ThunkConfig<T> {
    rejectValue: T
    extra: ThunkExtraArg
    state: StateSchema
}
