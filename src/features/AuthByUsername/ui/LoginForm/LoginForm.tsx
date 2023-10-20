import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { Button } from '@/shared/ui/redesigned/Button'
import { Input } from '@/shared/ui/redesigned/Input'
import { Text } from '@/shared/ui/redesigned/Text'
import { classNames } from '@/shared/lib/classNames/classNames'
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { getPassword } from '../../model/selectors/getPassword/getPassword'
import { getUsername } from '../../model/selectors/getUsername/getUsername'
import { getIsLoading } from '../../model/selectors/getIsLoading/getIsLoading'
import { getErrors } from '../../model/selectors/getErrors/getErrors'
import { loginByUsername } from '../../model/services/loginByUsername/LoginByUsername'
import { loginActions, loginReducer } from '../../model/slice/loginSlice'
import cls from './LoginForm.module.scss'
import { VStack } from '@/shared/ui/redesigned/Stack'

export interface LoginFormProps {
    className?: string
}

const initialReducers: ReducersList = {
    loginForm: loginReducer,
}

const LoginForm = memo((props: LoginFormProps) => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const password = useSelector(getPassword)
    const username = useSelector(getUsername)
    const isLoading = useSelector(getIsLoading)
    const error = useSelector(getErrors)

    const { className } = props
    const cn = classNames(cls.LoginForm, {}, [className])

    const loginError =
        error === 'Request failed with status code 403'
            ? t('notCorrectUserData')
            : error

    const onChangeUsername = useCallback(
        (value: string) => {
            dispatch(loginActions.setUsername(value))
        },
        [dispatch],
    )

    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(loginActions.setPassword(value))
        },
        [dispatch],
    )

    const onLoginClick = useCallback(() => {
        dispatch(loginByUsername({ username, password }))
    }, [dispatch, password, username])

    return (
        <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
            <VStack className={cn} gap="16">
                <Text title={t('authForm')} />
                {error && <Text text={loginError} variant="error" />}
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
                <Button
                    variant="outline"
                    onClick={onLoginClick}
                    disabled={isLoading}
                    right
                >
                    {t('logIn')}
                </Button>
            </VStack>
        </DynamicModuleLoader>
    )
})

export default LoginForm
