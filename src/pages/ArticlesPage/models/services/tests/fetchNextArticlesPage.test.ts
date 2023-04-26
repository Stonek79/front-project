import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { fetchArticlesList } from '../fetchArticlesList'
import { fetchNextArticlesPage } from '../fetchNextArticlesPage'

jest.mock('../fetchArticlesList')

describe('fetchNextArticlesPage test', () => {
    test('success get next page', async () => {
        const thunk = TestAsyncThunk(fetchNextArticlesPage, {
            articlesPage: {
                page: 2,
                hasMore: true,
                ids: [],
                entities: {},
                limit: 5,
                isLoading: false,
            },
        })

        const result = await thunk.callThunk()
        expect(thunk.dispatch).toBeCalledTimes(4)
        expect(fetchArticlesList).toHaveBeenCalled()

        expect(result.meta.requestStatus).toBe('fulfilled')
    })
    test('success fetchArticlesList not called', async () => {
        const thunk = TestAsyncThunk(fetchNextArticlesPage, {
            articlesPage: {
                page: 2,
                hasMore: false,
                ids: [],
                entities: {},
                limit: 5,
                isLoading: false,
            },
        })

        const result = await thunk.callThunk()
        expect(thunk.dispatch).toBeCalledTimes(2)
        expect(fetchArticlesList).not.toHaveBeenCalled()

        expect(result.meta.requestStatus).toBe('fulfilled')
    })

    test('fetch isLoading true', async () => {
        const thunk = TestAsyncThunk(fetchNextArticlesPage, {
            articlesPage: {
                page: 2,
                hasMore: true,
                ids: [],
                entities: {},
                limit: 5,
                isLoading: true,
            },
        })

        const result = await thunk.callThunk()
        expect(thunk.dispatch).toBeCalledTimes(2)
        expect(fetchArticlesList).not.toHaveBeenCalled()
    })
})
