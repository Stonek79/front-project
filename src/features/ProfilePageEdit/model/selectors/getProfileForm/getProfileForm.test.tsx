import { StateSchema } from '@/app/providers/StoreProvider'
import { Currency } from '@/entities/Currency'
import { Countries } from '@/entities/Country'
import { getProfileForm } from './getProfileForm'

const data = {
    firstname: 'Alex',
    lastname: 'Smith',
    age: '42',
    currency: Currency.RUB,
    country: Countries.Russia,
    city: 'Moscow',
    username: 'StoneK',
}

describe('get Profile Form test', () => {
    test('should return Profile Form', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                form: data,
            },
        }
        expect(getProfileForm(state as StateSchema)).toEqual(data)
    })

    test('should return undefined', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getProfileForm(state as StateSchema)).toEqual(undefined)
    })
})
