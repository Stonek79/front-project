import { FC } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { Button } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'
import cls from './LoginForm.module.scss'

interface LoginFormProps {
    className?: string;
    isOpen?: boolean
}

export const LoginForm: FC<LoginFormProps> = (props) => {
    const { t } = useTranslation()
    const { className, isOpen } = props
    const cn = classNames(cls.LoginForm, {}, [className])

    return (
        <div className={cn}>
            <Input
                autofocus
                type="text"
                className={cls.input}
                placeholder={t('Enter username')}
                isOpenModal={isOpen}
            />
            <Input
                type="text"
                className={cls.input}
                placeholder={t('Enter password')}
            />
            <Button className={cls.loginBtn}>{t('logIn')}</Button>
        </div>
    )
}
