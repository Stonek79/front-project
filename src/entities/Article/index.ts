export { ArticleEdit } from './ui/ArticleEdit/ArticleEdit'
export { getArticleDetailsData } from './model/selectors/articleDetails'
export {
    articleDetailsPageRecommendationsSliceReducer,
    getArticlesRecommendations,
} from './model/slice/articleDetailsPageRecommendationsSlice'
export { getArticlesRecommendationsIsLoading } from './model/selectors/articlesRecommendations'
export { fetchArticlesRecommendations } from './model/services/fetchArticlesRecommendations'
export type { ArticleDetailsRecommendationsSchema } from './model/types/articleDetailsRecommendationsSchema'
export { ArticleList } from './ui/AtricleList/ArticleList'
export { ArticleDetails } from './ui/ArticleDetails/ArticleDetails'
export type {
    Article,
    ArticleViewTypes,
    ArticleTypesType,
    ArticleSortFieldTypes,
} from './model/types/article'
export type { ArticleDetailsSchema } from './model/types/articleDetailsSchema'
export {
    ArticleView,
    ArticleTypes,
    ArticleSortField,
    ArticleBlockTypes,
} from './model/consts/consts'
