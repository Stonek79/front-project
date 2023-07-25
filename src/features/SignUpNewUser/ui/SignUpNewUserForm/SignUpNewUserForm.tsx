import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './SignUpNewUserForm.module.scss'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { Text } from '@/shared/ui/redesigned/Text'
import { Input } from '@/shared/ui/redesigned/Input'
import { Button } from '@/shared/ui/redesigned/Button'
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { getErrors } from '../../model/selectors/getErrors'
import { getIsLoading } from '../../model/selectors/getIsLoading'
import { getUsername } from '../../model/selectors/getUsername'
import { getPassword } from '../../model/selectors/getPassword'
import { signUpActions, signUpReducer } from '../../model/slice/signUpSlice'
import { addNewUser } from '../../model/services/AddNewUser'
import { getConfirmedPassword } from '../../model/selectors/getConfirmedPassword'
import { newUserSchema, signUpErrors } from '../../model/consts/consts'
import { getRouteProfile } from '@/shared/const/router'

export interface SignUpNewUserFormProps {
    className?: string
}

const initialReducers: ReducersList = {
    signUpForm: signUpReducer,
}

const SignUpNewUserForm = memo((props: SignUpNewUserFormProps) => {
    const { className } = props
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const password = useSelector(getPassword)
    const confirmedPassword = useSelector(getConfirmedPassword)
    const username = useSelector(getUsername)
    const isLoading = useSelector(getIsLoading)
    const error = useSelector(getErrors) || ''

    const isEqualPasswords = password === confirmedPassword

    const cn = classNames(cls.SignUpNewUserForm, {}, [className])

    const signUpValidateErrors = {
        [signUpErrors.IS_EQUAL_ERROR]: t('Passwords must match'),
        [signUpErrors.HAS_FILLED]: t('All fields mast be filled'),
        [signUpErrors.MIN_LENGTH]: t('Min length 4 character'),
        [signUpErrors.MAX_LENGTH]: t('Max length 20 characters'),
        [signUpErrors.EXIST]: t('Username already exist'),
    }

    const errorMessage = signUpValidateErrors[error]

    const profileRoute = useCallback(
        (id: string) => {
            navigate(getRouteProfile(id))
        },
        [navigate],
    )

    const onChangeUsername = useCallback(
        (value: string) => {
            dispatch(signUpActions.setNewUsername(value))
        },
        [dispatch],
    )

    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(signUpActions.setPassword(value))
        },
        [dispatch],
    )

    const onChangeConfirmedPassword = useCallback(
        (value: string) => {
            dispatch(signUpActions.setConfirmedPassword(value))
        },
        [dispatch],
    )

    const onLoginClick = useCallback(() => {
        if (!isEqualPasswords) {
            return dispatch(signUpActions.setError(signUpErrors.IS_EQUAL_ERROR))
        }

        if (!username?.length || !password?.length) {
            return dispatch(signUpActions.setError(signUpErrors.HAS_FILLED))
        }

        if (username?.length > 20 || password?.length > 20) {
            return dispatch(signUpActions.setError(signUpErrors.MAX_LENGTH))
        }

        if (username?.length < 4 || password?.length < 4) {
            return dispatch(signUpActions.setError(signUpErrors.MIN_LENGTH))
        }

        const newUser = { ...newUserSchema, username, password }

        return dispatch(addNewUser({ newUser, profileRoute }))
    }, [dispatch, isEqualPasswords, password, profileRoute, username])

    return (
        <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
            <VStack className={cn} gap="16">
                <Text title={t('signupForm')} />
                {error && <Text text={errorMessage} variant="error" />}
                <Input
                    autofocus
                    type="text"
                    placeholder={t('Enter username')}
                    onChange={onChangeUsername}
                    value={username}
                />
                <Input
                    type="text"
                    placeholder={t('Enter password')}
                    onChange={onChangePassword}
                    value={password}
                />
                <Input
                    type="text"
                    placeholder={t('Repeat password')}
                    onChange={onChangeConfirmedPassword}
                    value={confirmedPassword}
                />
                <Button
                    variant="outline"
                    onClick={onLoginClick}
                    disabled={isLoading}
                    right
                >
                    {t('Sign up')}
                </Button>
            </VStack>
        </DynamicModuleLoader>
    )
})

export default SignUpNewUserForm
