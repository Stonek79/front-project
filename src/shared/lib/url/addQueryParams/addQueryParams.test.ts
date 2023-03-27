import { getQueryParams } from './addQueryParams'

describe('addQueryParams test', () => {
    test('with one param', () => {
        const params = getQueryParams({
            one: 'value',
        })

        expect(params).toBe('?one=value')
    })

    test('with many params', () => {
        const params = getQueryParams({
            one: 'value',
            two: 'valueTwo',
            three: 'valueThree',
        })

        expect(params).toBe('?one=value&two=valueTwo&three=valueThree')
    })

    test('with undefined', () => {
        const params = getQueryParams({
            one: 'value',
            two: undefined,
        })

        expect(params).toBe('?one=value')
    })
})
