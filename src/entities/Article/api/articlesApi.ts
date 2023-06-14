import { rtkApi } from '@/shared/api/rtkApi'
import { Article } from '../model/types/article'

const articlesApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        editArticle: build.mutation<Article, Partial<Article>>({
            query: ({ id, ...editedArticle }) => ({
                url: `/articles/${id}`,
                method: 'PATCH',
                body: { ...editedArticle },
            }),
        }),
    }),
})

export const setEditArticleMutation = articlesApi.endpoints.editArticle.initiate
