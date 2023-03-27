export {
    articleDetailsPageRecommendationsSliceReducer,
    getArticlesRecommendations,
} from './model/slice/articleDetailsPageRecommendationsSlice'
export { getArticlesRecommendationsIsLoading } from './model/selectors/articlesRecommendations'
export { fetchArticlesRecommendations } from './model/services/fetchArticlesRecommendations'
export { ArticleDetailsRecommendationsSchema } from './model/types/articleDetailsRecommendationsSchema'
export { ArticleList } from './ui/AtricleList/ArticleList'
export { ArticleDetails } from './ui/ArticleDetails/ArticleDetails'
export {
    Article, ArticleView, ArticleSortField, ArticleType,
} from './model/types/article'
export type { ArticleDetailsSchema } from './model/types/articleDetailsSchema'
