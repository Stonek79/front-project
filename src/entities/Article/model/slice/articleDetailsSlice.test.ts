import { DeepPartial } from '@reduxjs/toolkit'
import { ArticleDetailsSchema } from 'entities/Article'
import { articleDetailsReducer } from './articleDetailsSlice'
import { ArticleType } from '../../model/types/article'
import { fetchArticleById } from '../../model/services/fetchArticleById'

const testData = {
    id: '1',
    title: 'Javascript news',
    subtitle: 'Что нового в JS за 2022 год?',
    img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
    views: 1022,
    createdAt: '26.02.2022',
    type: [ArticleType.IT],
    blocks: [],
}

describe('articleDetailsSlice test', () => {
    test('fetchArticleById pending', () => {
        const state: DeepPartial<ArticleDetailsSchema> = {
            isLoading: false,
            error: 'error',
        }
        expect(articleDetailsReducer(state as ArticleDetailsSchema, fetchArticleById.pending))
            .toEqual({
                isLoading: true,
                validateErrors: undefined,
            })
    })

    test('fetchArticleById fulfilled', () => {
        const state: DeepPartial<ArticleDetailsSchema> = {
            isLoading: true,
            data: undefined,
        }

        expect(articleDetailsReducer(state as ArticleDetailsSchema, fetchArticleById.fulfilled(testData, '', '')))
            .toEqual({
                isLoading: false,
                data: testData,
            })
    })
})
