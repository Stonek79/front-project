import { EntityState } from '@reduxjs/toolkit'
import { Article } from './article'

export interface ArticleDetailsRecommendationsSchema
    extends EntityState<Article> {
    isLoading?: boolean
    error?: string
}
