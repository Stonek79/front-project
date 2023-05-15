import {
    Profile,
    ValidateErrors,
    ValidateProfileErrors,
} from '@/entities/Profile'

export const ValidateProfileData = (profile?: Profile) => {
    const errors: ValidateErrors = {
        data: [],
        firstname: [],
        lastname: [],
        age: [],
        city: [],
        username: [],
        currency: [],
        country: [],
    }

    if (!profile) {
        errors.data.push(ValidateProfileErrors.NO_DATA)
        return errors
    }

    if (typeof profile !== 'object') {
        errors.data.push(ValidateProfileErrors.SERVER_ERROR)
        return errors
    }

    const { firstname, lastname, age, city, username, country, currency } =
        profile as Profile

    const minLength = 2
    const maxLength = 16

    if (!firstname) {
        errors.firstname.push(ValidateProfileErrors.REQUIRED)
    }

    if (!lastname) {
        errors.lastname.push(ValidateProfileErrors.REQUIRED)
    }

    if (!age) {
        errors.age.push(ValidateProfileErrors.REQUIRED)
    }

    if (!city) {
        errors.city.push(ValidateProfileErrors.REQUIRED)
    }

    if (!username) {
        errors.username.push(ValidateProfileErrors.REQUIRED)
    }

    if (!currency) {
        errors.currency.push(ValidateProfileErrors.REQUIRED)
    }

    if (!country) {
        errors.country.push(ValidateProfileErrors.REQUIRED)
    }

    if (
        firstname &&
        (firstname.length > maxLength || firstname.length < minLength)
    ) {
        errors.firstname.push(ValidateProfileErrors.INCORRECT_LENGTH)
    }

    if (
        lastname &&
        (lastname.length > maxLength || lastname.length < minLength)
    ) {
        errors.lastname.push(ValidateProfileErrors.INCORRECT_LENGTH)
    }

    if (city && (city.length > maxLength || city.length < minLength)) {
        errors.city.push(ValidateProfileErrors.INCORRECT_LENGTH)
    }

    if (
        username &&
        (username.length > maxLength || username.length < minLength)
    ) {
        errors.username.push(ValidateProfileErrors.INCORRECT_LENGTH)
    }

    if (age && (+age < 5 || +age > 120)) {
        errors.age.push(ValidateProfileErrors.INCORRECT_AGE)
    }

    return errors
}
