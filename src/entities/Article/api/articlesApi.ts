import { rtkApi } from '@/shared/api/rtkApi'
import { Article, NewArticle } from '../model/types/article'

const articlesApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        editArticle: build.mutation<Article, Partial<Article>>({
            query: ({ id, ...editedArticle }) => ({
                url: `/articles/${id}`,
                method: 'PATCH',
                body: { ...editedArticle },
            }),
        }),
        addNewArticle: build.mutation<Article, Partial<NewArticle>>({
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
        editArticleView: build.mutation<Article, Partial<Article>>({
            query: ({ id, ...article }) => ({
                url: `/articles/${id}`,
                method: 'PUT',
                body: article,
            }),
        }),
    }),
})

export const {
    useDeleteArticleMutation,
    useAddNewArticleMutation,
    useEditArticleMutation,
    useEditArticleViewMutation,
    usePrefetch,
} = articlesApi
