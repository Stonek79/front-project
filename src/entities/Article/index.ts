export { articleBaseData } from './model/consts/article'
export { fetchArticleById } from './model/services/fetchArticleById'
export {
    useDeleteArticleMutation,
    usePrefetch,
    useAddNewArticleMutation,
    useEditArticleMutation,
    useEditArticleViewMutation,
} from './api/articlesApi'
export { ArticleBlocksComponent } from './ui/ArticleBlocksComponent/ArticleBlocksComponent'
export {
    getArticleDetailsFormData,
    getArticleIsLoadingData,
    getArticleDetailsData,
} from './model/selectors/articleDetails'
export {
    articleDetailsPageRecommendationsSliceReducer,
    getArticlesRecommendations,
} from './model/slice/articleDetailsPageRecommendationsSlice'
export {
    articleDetailsActions,
    articleDetailsReducer,
} from './model/slice/articleDetailsSlice'
export { getArticlesRecommendationsIsLoading } from './model/selectors/articlesRecommendations'
export { fetchArticlesRecommendations } from './model/services/fetchArticlesRecommendations'
export { ArticleList } from './ui/AtricleList/ArticleList'
export { ArticleDetails } from './ui/ArticleDetails/ArticleDetails'
export type { ArticleDetailsRecommendationsSchema } from './model/types/articleDetailsRecommendationsSchema'
export type {
    Article,
    ArticleBlock,
    ArticleViewTypes,
    ArticleTypesType,
    ArticleSortFieldTypes,
    ArticleBlockTypesType,
    NewArticle,
} from './model/types/article'
export type { ArticleDetailsSchema } from './model/types/articleDetailsSchema'
export {
    ArticleView,
    ArticleTypes,
    ArticleSortField,
    ArticleBlockTypes,
    NewArticleCodeBlock,
    NewArticleImageBlock,
    NewArticleTextBlock,
} from './model/consts/consts'
