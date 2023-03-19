import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { ArticleType } from 'entities/Article/model/types/article'
import { fetchArticleById } from './fetchArticleById'

jest.mock('axios')

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

describe('FetchProfileData test', () => {
    test('success get data test', async () => {
        const thunk = TestAsyncThunk(fetchArticleById)
        thunk.api.get.mockReturnValue(Promise.resolve({ data: testData }))

        const result = await thunk.callThunk('1')

        expect(thunk.api.get).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toBe(testData)
    })

    test('rejected with error 404', async () => {
        const thunk = TestAsyncThunk(fetchArticleById)
        thunk.api.get.mockReturnValue(Promise.resolve({ status: 404 }))

        const result = await thunk.callThunk('2')

        expect(thunk.api.get).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('rejected')
        expect(result.payload).toBe('404')
    })
})
