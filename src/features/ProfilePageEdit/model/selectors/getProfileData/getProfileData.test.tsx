import { StateSchema } from '@/app/providers/StoreProvider'
import { Currency } from '@/entities/Currency'
import { Countries } from '@/entities/Country'
import { getProfileData } from './getProfileData'

const data = {
    firstname: 'Alex',
    lastname: 'Smith',
    age: '42',
    currency: Currency.RUB,
    country: Countries.Russia,
    city: 'Moscow',
    username: 'StoneK',
}

describe('get Profile Data test', () => {
    test('should return Profile Data', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                data,
            },
        }
        expect(getProfileData(state as StateSchema)).toEqual(data)
    })

    test('should return undefined', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getProfileData(state as StateSchema)).toEqual(undefined)
    })
})
