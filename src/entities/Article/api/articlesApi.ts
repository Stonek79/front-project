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
        addNewArticle: build.mutation<Article, Partial<Article>>({
            query: (newArticle) => ({
                url: `/articles`,
                method: 'POST',
                body: newArticle,
            }),
        }),
    }),
})

export const setEditArticleMutation = articlesApi.endpoints.editArticle.initiate
export const setNewArticleMutation =
    articlesApi.endpoints.addNewArticle.initiate
