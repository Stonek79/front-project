import { memo, useCallback } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'
import { useSelector } from 'react-redux'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { getPassword } from '../../model/selectors/getPassword/getPassword'
import { getUsername } from '../../model/selectors/getUsername/getUsername'
import { getIsLoading } from '../../model/selectors/getIsLoading/getIsLoading'
import { getErrors } from '../../model/selectors/getErrors/getErrors'
import { loginByUsername } from '../../model/services/loginByUsername/LoginByUsername'
import { loginActions, loginReducer } from '../../model/slice/loginSlice'
import cls from './LoginForm.module.scss'

export interface LoginFormProps {
    className?: string;
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

    const onChangeUsername = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value))
    }, [dispatch])

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value))
    }, [dispatch])

    const onLoginClick = useCallback(() => {
        dispatch(loginByUsername({ username, password }))
    }, [dispatch, password, username])

    return (
        <DynamicModuleLoader
            reducers={initialReducers}
            removeAfterUnmount
        >
            <div className={cn}>
                <Text title={t('authForm')} />
                {error && <Text text={error} theme={TextTheme.ERROR} />}
                <Input
                    autofocus
                    type="text"
                    className={cls.input}
                    placeholder={t('Enter username')}
                    onChange={onChangeUsername}
                    value={username}
                />
                <Input
                    type="text"
                    className={cls.input}
                    placeholder={t('Enter password')}
                    onChange={onChangePassword}
                    value={password}
                />
                <Button
                    theme={ButtonTheme.OUTLINE}
                    className={cls.loginBtn}
                    onClick={onLoginClick}
                    disabled={isLoading}
                >
                    {t('logIn')}
                </Button>
            </div>
        </DynamicModuleLoader>
    )
})

export default LoginForm
