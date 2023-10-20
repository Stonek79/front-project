import { UserRoles } from '@/entities/User'
import { Theme } from '@/shared/const/theme'

export const newUserSchema = {
    id: '',
    username: '',
    password: '',
    roles: [UserRoles.USER],
    features: {
        isArticleRatingEnabled: false,
        isAppRedesigned: true,
    },
    jsonSettings: {
        theme: Theme.LIGHT,
        isArticlesPageOpened: false,
    },
    avatar: '',
}

export const signUpErrors = {
    IS_EQUAL_ERROR: 'IS_EQUAL_ERROR',
    HAS_FILLED: 'HAS_FILLED',
    MIN_LENGTH: 'MIN_LENGTH',
    MAX_LENGTH: 'MAX_LENGTH',
    EXIST: 'EXIST',
}
