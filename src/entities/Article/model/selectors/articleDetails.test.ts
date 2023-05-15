import { StateSchema } from '@/app/providers/StoreProvider'
import {
    getArticleDetailsData,
    getArticleErrorData,
    getArticleIsLoadingData,
} from './articleDetails'

describe('articleDetails.test', () => {
    test('should return data', () => {
        const data = {
            id: '1',
            title: 'subtitle',
        }
        const state: DeepPartial<StateSchema> = {
            article: {
                data,
            },
        }
        expect(getArticleDetailsData(state as StateSchema)).toEqual(data)
    })
    test('should work with empty state data', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getArticleDetailsData(state as StateSchema)).toEqual(undefined)
    })
    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            article: {
                error: 'error',
            },
        }
        expect(getArticleErrorData(state as StateSchema)).toEqual('error')
    })
    test('should work with empty state error', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getArticleErrorData(state as StateSchema)).toEqual(undefined)
    })
    test('should return isLoading', () => {
        const state: DeepPartial<StateSchema> = {
            article: {
                isLoading: true,
            },
        }
        expect(getArticleIsLoadingData(state as StateSchema)).toEqual(true)
    })
    test('should work with empty state isLoading', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getArticleIsLoadingData(state as StateSchema)).toEqual(false)
    })
})
