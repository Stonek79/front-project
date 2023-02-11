import { classNames } from './classNames'

describe('classNames function test', () => {
    test('with only class name', () => {
        expect(classNames('className')).toBe('className')
    })

    test('with one additional parameter', () => {
        const parameter = 'parameter'
        const expected = 'className parameter'

        expect(classNames('className', [parameter])).toBe(expected)
    })

    test('with some additional parameters', () => {
        const parameter = 'parameter'
        const expected = 'className parameter next next one'

        expect(classNames('className', [parameter, 'next', 'next one'])).toBe(expected)
    })

    test('with modes', () => {
        const expected = 'className hidden hovered'
        expect(classNames('className', [], { hidden: true, hovered: true })).toBe(expected)
    })

    test('with false mode', () => {
        const expected = 'className hidden'
        expect(classNames('className', [], { hidden: true, hovered: false })).toBe(expected)
    })

    test('with undefined mode', () => {
        const expected = 'className hidden'
        expect(classNames('className', [], { hidden: true, hovered: undefined })).toBe(expected)
    })

    test('with additional classes and modes', () => {
        const parameter = 'parameter next parameter'
        const expected = 'className parameter next parameter additional hidden hovered'
        expect(classNames('className', [parameter, 'additional'], { hidden: true, hovered: true })).toBe(expected)
    })
})
