export { getArticleDetailsFormData } from './model/selectors/articleDetails'
export { editArticle } from './model/services/editArticle'
export { getArticleDetailsData } from './model/selectors/articleDetails'
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
export type { ArticleDetailsRecommendationsSchema } from './model/types/articleDetailsRecommendationsSchema'
export { ArticleList } from './ui/AtricleList/ArticleList'
export { ArticleDetails } from './ui/ArticleDetails/ArticleDetails'
export type {
    Article,
    ArticleBlock,
    ArticleViewTypes,
    ArticleTypesType,
    ArticleSortFieldTypes,
    ArticleBlockTypesType,
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
