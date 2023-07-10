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
        deleteArticle: build.mutation<Article, string>({
            query: (id) => ({
                url: `/articles/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})

export const setEditArticleMutation = articlesApi.endpoints.editArticle.initiate
export const setNewArticleMutation =
    articlesApi.endpoints.addNewArticle.initiate
export const setDeleteArticleMutation =
    articlesApi.endpoints.deleteArticle.initiate
